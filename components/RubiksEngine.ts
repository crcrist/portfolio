// components/RubiksEngine.ts
import * as THREE from "three";

/**
 * Phase-1 Rubik's engine:
 * - 27 cubelets inside cubeGroup
 * - Click raycast -> pick face -> decide axis+layer -> animate 90° turn
 * - No React state; you call update(dt) once per frame from R3F
 */
export class RubiksEngine {
  public root: THREE.Group;       // external container you add to the R3F scene
  private cubeGroup: THREE.Group; // holds all 27 cubelets
  private raycaster = new THREE.Raycaster();
  private mouseNDC = new THREE.Vector2();

  // animation state
  private isTurning = false;
  private currentPivot: THREE.Group | null = null;
  private targetAngle = Math.PI / 2;
  private turnedAmount = 0;
  private turnSpeed = 3.2; // radians/sec (≈ 0.5s for 90°)

  // constants
  private offset = 1.05; // spacing between cubelet centers
  private COLORS = {
    right: 0x1976d2,  // blue  (+X)
    left: 0x43a047,   // green (-X)
    up: 0xffffff,     // white (+Y)
    down: 0xfbc02d,   // yellow(-Y)
    front: 0xd32f2f,  // red   (+Z)
    back: 0xff9800,   // orange(-Z)
    internal: 0x111111,
  };

  constructor() {
    this.root = new THREE.Group();
    this.cubeGroup = new THREE.Group();
    this.root.add(this.cubeGroup);
    this.buildCube();
  }

  /** Build 27 cubelets with proper face colors and black internals */
  private buildCube() {
    const g = new THREE.BoxGeometry(0.95, 0.95, 0.95);

    // IMPORTANT: material order for BoxGeometry is:
    // 0: +X (px), 1: -X (nx), 2: +Y (py), 3: -Y (ny), 4: +Z (pz), 5: -Z (nz)
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const materials = [
            new THREE.MeshStandardMaterial({
              color: x === 1 ? this.COLORS.right : this.COLORS.internal,
              roughness: 0.3,
              metalness: 0.1,
            }),
            new THREE.MeshStandardMaterial({
              color: x === -1 ? this.COLORS.left : this.COLORS.internal,
              roughness: 0.3,
              metalness: 0.1,
            }),
            new THREE.MeshStandardMaterial({
              color: y === 1 ? this.COLORS.up : this.COLORS.internal,
              roughness: 0.3,
              metalness: 0.1,
            }),
            new THREE.MeshStandardMaterial({
              color: y === -1 ? this.COLORS.down : this.COLORS.internal,
              roughness: 0.3,
              metalness: 0.1,
            }),
            new THREE.MeshStandardMaterial({
              color: z === 1 ? this.COLORS.front : this.COLORS.internal,
              roughness: 0.3,
              metalness: 0.1,
            }),
            new THREE.MeshStandardMaterial({
              color: z === -1 ? this.COLORS.back : this.COLORS.internal,
              roughness: 0.3,
              metalness: 0.1,
            }),
          ];

          const m = new THREE.Mesh(g, materials);
          m.position.set(x * this.offset, y * this.offset, z * this.offset);
          // Save integer coordinates (layer indices) for fast queries
          (m as any).grid = { x, y, z };
          m.castShadow = true;
          m.receiveShadow = true;
          this.cubeGroup.add(m);
        }
      }
    }
  }

  /**
   * Public: handle a DOM pointer click (clientX/clientY) with camera & canvas size
   * We do our own raycast to the cubelets and figure out the face/layer to turn.
   */
public click(clientX: number, clientY: number, camera: THREE.Camera, size: { width: number; height: number; }) {
  if (this.isTurning) return;

  // Convert mouse to NDC
  this.mouseNDC.set(
    (clientX / size.width) * 2 - 1,
    -(clientY / size.height) * 2 + 1
  );

  this.raycaster.setFromCamera(this.mouseNDC, camera);
  const hits = this.raycaster.intersectObjects(this.cubeGroup.children, false);
  if (!hits.length) return;

  const hit = hits[0];
  const mesh = hit.object as THREE.Mesh;
  const faceIndex = hit.faceIndex ?? 0;
  const faceId = Math.floor(faceIndex / 2);

  const grid = (mesh as any).grid as { x: number; y: number; z: number };
  if (!grid) return;

  // Normal of the face that was clicked (in world space)
  const faceNormal = new THREE.Vector3();
  const normals = [
    new THREE.Vector3(1, 0, 0),   // +X
    new THREE.Vector3(-1, 0, 0),  // -X
    new THREE.Vector3(0, 1, 0),   // +Y
    new THREE.Vector3(0, -1, 0),  // -Y
    new THREE.Vector3(0, 0, 1),   // +Z
    new THREE.Vector3(0, 0, -1),  // -Z
  ];
  faceNormal.copy(normals[faceId]);
  faceNormal.applyNormalMatrix(mesh.normalMatrix).normalize();

  // Determine which world axis is dominant for this face normal
  const abs = faceNormal.clone().set(Math.abs(faceNormal.x), Math.abs(faceNormal.y), Math.abs(faceNormal.z));
  let axis: "x" | "y" | "z";
  let layerIndex = 0;
  let direction = 1;

  if (abs.x > abs.y && abs.x > abs.z) {
    axis = "x";
    layerIndex = Math.sign(faceNormal.x) > 0 ? +1 : -1;
  } else if (abs.y > abs.x && abs.y > abs.z) {
    axis = "y";
    layerIndex = Math.sign(faceNormal.y) > 0 ? +1 : -1;
  } else {
    axis = "z";
    layerIndex = Math.sign(faceNormal.z) > 0 ? +1 : -1;
  }

    // Decide rotation direction so clicked face turns toward camera perspective
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    const dot = camDir.dot(faceNormal);
    direction = dot > 0 ? +1 : -1; // Reversed logic so front face rotates correctly

  // Get members in that layer
  const layerFilter = (o: THREE.Object3D) => {
    const g = (o as any).grid as { x: number; y: number; z: number };
    if (!g) return false;
    if (axis === "x") return g.x === layerIndex;
    if (axis === "y") return g.y === layerIndex;
    return g.z === layerIndex;
  };

  const members = this.cubeGroup.children.filter(layerFilter);
  if (!members.length) return;

  this.startTurn(axis, layerIndex, direction as 1 | -1, members);
}


  /** Kick off the 90° turn using a temporary pivot group */
  private startTurn(axis: "x" | "y" | "z", layerIndex: number, direction: 1 | -1, members: THREE.Object3D[]) {
    if (this.isTurning) return;

    const pivot = new THREE.Group();
    pivot.position.set(
      axis === "x" ? layerIndex * this.offset : 0,
      axis === "y" ? layerIndex * this.offset : 0,
      axis === "z" ? layerIndex * this.offset : 0
    );
    this.cubeGroup.add(pivot);

    // attach selected layer under the pivot (keeps world transforms)
    members.forEach((m) => pivot.attach(m));

    // save rotation plan on pivot
    (pivot as any).axis = axis;
    (pivot as any).direction = direction;

    this.currentPivot = pivot;
    this.turnedAmount = 0;
    this.isTurning = true;
  }

  /** Call every frame with delta time (seconds) */
  public update(dt: number) {
    if (!this.isTurning || !this.currentPivot) return;

    const axis = (this.currentPivot as any).axis as "x" | "y" | "z";
    const dir = (this.currentPivot as any).direction as 1 | -1;
    const step = this.turnSpeed * dt; // radians this frame
    const remain = this.targetAngle - this.turnedAmount;
    const d = Math.min(step, remain);

    // rotate pivot
    switch (axis) {
      case "x": this.currentPivot.rotateX(dir * d); break;
      case "y": this.currentPivot.rotateY(dir * d); break;
      case "z": this.currentPivot.rotateZ(dir * d); break;
    }
    this.turnedAmount += d;

    if (this.turnedAmount + 1e-6 >= this.targetAngle) {
      // Snap exactly to 90°
      const snap = this.targetAngle - this.turnedAmount;
      if (Math.abs(snap) > 1e-6) {
        switch (axis) {
          case "x": this.currentPivot.rotateX(dir * snap); break;
          case "y": this.currentPivot.rotateY(dir * snap); break;
          case "z": this.currentPivot.rotateZ(dir * snap); break;
        }
      }

      // Detach children back to cubeGroup, keeping final world transforms
      const children = [...this.currentPivot.children];
      children.forEach((c) => this.cubeGroup.attach(c));

      // Clean up pivot
      this.cubeGroup.remove(this.currentPivot);
      this.currentPivot.clear();
      this.currentPivot = null;
      this.isTurning = false;

      // Re-assign integer grid coordinates to the rotated members
      // (Round positions back to -1/0/1 in grid space to keep future layer picks exact)
      children.forEach((c) => {
        // Convert world position back to grid index
        const gx = Math.round(c.position.x / this.offset);
        const gy = Math.round(c.position.y / this.offset);
        const gz = Math.round(c.position.z / this.offset);
        (c as any).grid = { x: gx, y: gy, z: gz };
      });
    }
  }
}
