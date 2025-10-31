"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type SpaceShooterGameProps = {
  onGameOver: () => void;
};

type Enemy = {
  id: number;
  x: number;
  y: number;
  speed: number;
};

type Bullet = {
  id: number;
  x: number;
  y: number;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

export default function SpaceShooterGame({ onGameOver }: SpaceShooterGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  // Game state refs
  const playerX = useRef(200);
  const enemies = useRef<Enemy[]>([]);
  const bullets = useRef<Bullet[]>([]);
  const particles = useRef<Particle[]>([]);
  const keys = useRef<{ [key: string]: boolean }>({});
  const lastShot = useRef(0);
  const enemyIdCounter = useRef(0);
  const bulletIdCounter = useRef(0);
  const particleIdCounter = useRef(0);
  const animationFrame = useRef<number | null>(null);

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 500;
  const PLAYER_WIDTH = 30;
  const PLAYER_HEIGHT = 30;
  const ENEMY_SIZE = 25;
  const BULLET_WIDTH = 4;
  const BULLET_HEIGHT = 12;
  const PLAYER_SPEED = 5;
  const BULLET_SPEED = 8;

  // Spawn enemies
  const spawnEnemy = useCallback(() => {
    const newEnemy: Enemy = {
      id: enemyIdCounter.current++,
      x: Math.random() * (CANVAS_WIDTH - ENEMY_SIZE),
      y: -ENEMY_SIZE,
      speed: 1 + Math.random() * 2
    };
    enemies.current.push(newEnemy);
  }, []);

  // Shoot bullet
  const shoot = useCallback(() => {
    const now = Date.now();
    if (now - lastShot.current > 200) {
      bullets.current.push({
        id: bulletIdCounter.current++,
        x: playerX.current + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
        y: CANVAS_HEIGHT - PLAYER_HEIGHT - 10
      });
      lastShot.current = now;
    }
  }, []);

  // Create explosion particles
  const createExplosion = useCallback((x: number, y: number) => {
    for (let i = 0; i < 15; i++) {
      particles.current.push({
        id: particleIdCounter.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 30
      });
    }
  }, []);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let spawnTimer = 0;

    const gameLoop = () => {
      if (gameOver) return;

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw stars background
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 50; i++) {
        const x = (i * 37) % CANVAS_WIDTH;
        const y = (i * 73 + Date.now() * 0.05) % CANVAS_HEIGHT;
        ctx.fillRect(x, y, 1, 1);
      }

      // Handle player movement
      if (keys.current['ArrowLeft'] && playerX.current > 0) {
        playerX.current -= PLAYER_SPEED;
      }
      if (keys.current['ArrowRight'] && playerX.current < CANVAS_WIDTH - PLAYER_WIDTH) {
        playerX.current += PLAYER_SPEED;
      }
      if (keys.current[' ']) {
        shoot();
      }

      // Draw player (spaceship)
      ctx.fillStyle = '#00ffff';
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 15;
      
      // Ship body
      ctx.beginPath();
      ctx.moveTo(playerX.current + PLAYER_WIDTH / 2, CANVAS_HEIGHT - PLAYER_HEIGHT);
      ctx.lineTo(playerX.current, CANVAS_HEIGHT - 5);
      ctx.lineTo(playerX.current + PLAYER_WIDTH, CANVAS_HEIGHT - 5);
      ctx.closePath();
      ctx.fill();
      
      // Wings
      ctx.fillStyle = '#0088ff';
      ctx.fillRect(playerX.current - 5, CANVAS_HEIGHT - 15, 10, 10);
      ctx.fillRect(playerX.current + PLAYER_WIDTH - 5, CANVAS_HEIGHT - 15, 10, 10);
      
      ctx.shadowBlur = 0;

      // Spawn enemies
      spawnTimer++;
      if (spawnTimer > 60) {
        spawnEnemy();
        spawnTimer = 0;
      }

      // Update and draw enemies
      ctx.fillStyle = '#ff00ff';
      ctx.shadowColor = '#ff00ff';
      ctx.shadowBlur = 15;
      
      enemies.current = enemies.current.filter(enemy => {
        enemy.y += enemy.speed;

        // Check if enemy hit player
        if (
          enemy.y + ENEMY_SIZE > CANVAS_HEIGHT - PLAYER_HEIGHT &&
          enemy.x + ENEMY_SIZE > playerX.current &&
          enemy.x < playerX.current + PLAYER_WIDTH
        ) {
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameOver(true);
            }
            return newLives;
          });
          createExplosion(enemy.x + ENEMY_SIZE / 2, enemy.y + ENEMY_SIZE / 2);
          return false;
        }

        // Remove if off screen
        if (enemy.y > CANVAS_HEIGHT) {
          return false;
        }

        // Draw enemy (invader)
        ctx.fillRect(enemy.x, enemy.y, ENEMY_SIZE, ENEMY_SIZE);
        ctx.fillStyle = '#000';
        ctx.fillRect(enemy.x + 5, enemy.y + 5, 5, 5);
        ctx.fillRect(enemy.x + 15, enemy.y + 5, 5, 5);
        ctx.fillRect(enemy.x + 8, enemy.y + 15, 10, 5);
        ctx.fillStyle = '#ff00ff';

        return true;
      });
      
      ctx.shadowBlur = 0;

      // Update and draw bullets
      ctx.fillStyle = '#ffff00';
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 10;
      
      bullets.current = bullets.current.filter(bullet => {
        bullet.y -= BULLET_SPEED;

        // Check collision with enemies
        let hit = false;
        enemies.current = enemies.current.filter(enemy => {
          if (
            bullet.y < enemy.y + ENEMY_SIZE &&
            bullet.y + BULLET_HEIGHT > enemy.y &&
            bullet.x + BULLET_WIDTH > enemy.x &&
            bullet.x < enemy.x + ENEMY_SIZE
          ) {
            hit = true;
            setScore(prev => prev + 100);
            createExplosion(enemy.x + ENEMY_SIZE / 2, enemy.y + ENEMY_SIZE / 2);
            return false;
          }
          return true;
        });

        if (hit) return false;
        if (bullet.y < 0) return false;

        // Draw bullet
        ctx.fillRect(bullet.x, bullet.y, BULLET_WIDTH, BULLET_HEIGHT);

        return true;
      });
      
      ctx.shadowBlur = 0;

      // Update and draw particles
      ctx.fillStyle = '#ff8800';
      particles.current = particles.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        if (particle.life <= 0) return false;

        ctx.globalAlpha = particle.life / 30;
        ctx.fillRect(particle.x, particle.y, 3, 3);
        ctx.globalAlpha = 1;

        return true;
      });

      // Draw UI
      ctx.fillStyle = '#00ffff';
      ctx.font = 'bold 20px monospace';
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 10;
      ctx.fillText(`SCORE: ${score}`, 10, 30);
      
      ctx.fillStyle = '#ff00ff';
      ctx.shadowColor = '#ff00ff';
      ctx.fillText(`LIVES: ${lives}`, CANVAS_WIDTH - 120, 30);
      ctx.shadowBlur = 0;

      animationFrame.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [gameOver, score, lives, shoot, spawnEnemy, createExplosion]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game over handling
  useEffect(() => {
    if (gameOver) {
      const highScore = parseInt(localStorage.getItem('highScore') || '0');
      if (score > highScore) {
        localStorage.setItem('highScore', score.toString());
      }
      
      setTimeout(() => {
        onGameOver();
      }, 3000);
    }
  }, [gameOver, score, onGameOver]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-4 border-cyan-500"
        style={{
          boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)',
          imageRendering: 'pixelated'
        }}
      />
      
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <div className="text-5xl font-black mb-4 text-red-500 animate-pulse"
                 style={{
                   fontFamily: 'Impact, sans-serif',
                   textShadow: '0 0 30px rgba(239, 68, 68, 0.8)'
                 }}>
              GAME OVER
            </div>
            <div className="text-3xl font-black text-yellow-400 mb-4"
                 style={{
                   fontFamily: 'Impact, sans-serif',
                   textShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
                 }}>
              FINAL SCORE: {score}
            </div>
            <div className="text-xl text-cyan-400"
                 style={{
                   fontFamily: 'monospace',
                   textShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
                 }}>
              Returning to attract mode...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
