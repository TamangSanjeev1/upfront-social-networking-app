import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <style>
      .upfront-login {
        --uf-bg:       #0b0c0f;
        --uf-panel:    #111318;
        --uf-border:   #1f2229;
        --uf-accent:   #e8ff47;
        --uf-accent2:  #47d4ff;
        --uf-text:     #f0f1f5;
        --uf-muted:    #6b7280;
        --uf-input-bg: #16181f;
        --uf-radius:   14px;

        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        height: 100vh;
        min-height: 600px;
        font-family: 'DM Sans', sans-serif;
        background: var(--uf-bg);
        color: var(--uf-text);
        overflow: hidden;
        box-sizing: border-box;
      }

      .upfront-login *, .upfront-login *::before, .upfront-login *::after {
        box-sizing: border-box;
      }

      /* ── Background ── */
      .uf-bg-canvas {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }
      .uf-bg-grid {
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(232,255,71,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,255,71,.04) 1px, transparent 1px);
        background-size: 48px 48px;
      }
      .uf-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        opacity: .18;
        animation: uf-drift 14s ease-in-out infinite alternate;
      }
      .uf-blob-1 { width: 520px; height: 520px; background: var(--uf-accent);  top: -160px; left: -120px; animation-duration: 16s; }
      .uf-blob-2 { width: 400px; height: 400px; background: var(--uf-accent2); bottom: -100px; right: -80px; animation-duration: 12s; animation-delay: -6s; }
      .uf-blob-3 { width: 260px; height: 260px; background: #ff6b6b; top: 40%; left: 50%; animation-duration: 20s; animation-delay: -3s; opacity: .10; }

      @keyframes uf-drift {
        from { transform: translate(0, 0) scale(1); }
        to   { transform: translate(30px, 40px) scale(1.08); }
      }

      /* ── Left panel ── */
      .uf-left {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 52px 56px;
        border-right: 1px solid var(--uf-border);
        animation: uf-slide-left .7s cubic-bezier(.22,1,.36,1) both;
      }
      @keyframes uf-slide-left {
        from { opacity: 0; transform: translateX(-28px); }
        to   { opacity: 1; transform: translateX(0); }
      }

      .uf-wordmark {
        font-family: 'Syne', sans-serif;
        font-weight: 800;
        font-size: 1.5rem;
        letter-spacing: -.02em;
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--uf-text);
      }
      .uf-wordmark-dot {
        width: 10px;
        height: 10px;
        background: var(--uf-accent);
        border-radius: 50%;
        box-shadow: 0 0 14px var(--uf-accent);
        flex-shrink: 0;
      }

      .uf-hero {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 40px 0;
      }
      .uf-hero-tag {
        font-size: .72rem;
        font-weight: 500;
        letter-spacing: .18em;
        text-transform: uppercase;
        color: var(--uf-accent);
        margin-bottom: 22px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .uf-hero-tag::before {
        content: '';
        display: inline-block;
        width: 28px;
        height: 2px;
        background: var(--uf-accent);
      }
      .uf-h1 {
        font-family: 'Syne', sans-serif;
        font-size: clamp(2.4rem, 3.5vw, 3.8rem);
        font-weight: 800;
        line-height: 1.08;
        letter-spacing: -.04em;
        margin-bottom: 24px;
        color: var(--uf-text);
      }
      .uf-h1 em {
        font-style: normal;
        color: var(--uf-accent);
        position: relative;
      }
      .uf-h1 em::after {
        content: '';
        position: absolute;
        bottom: 4px; left: 0; right: 0;
        height: 3px;
        background: var(--uf-accent);
        opacity: .35;
      }
      .uf-hero-sub {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--uf-muted);
        max-width: 380px;
      }

      /* ── Right panel ── */
      .uf-right {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 56px;
        animation: uf-slide-right .7s cubic-bezier(.22,1,.36,1) .1s both;
      }
      @keyframes uf-slide-right {
        from { opacity: 0; transform: translateX(28px); }
        to   { opacity: 1; transform: translateX(0); }
      }

      /* ── Card ── */
      .uf-card {
        width: 100%;
        max-width: 420px;
        background: var(--uf-panel);
        border: 1px solid var(--uf-border);
        border-radius: 24px;
        padding: 44px 40px 40px;
        position: relative;
        overflow: hidden;
      }
      .uf-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--uf-accent), var(--uf-accent2), transparent);
      }

      .uf-card-header {
        margin-bottom: 34px;
      }
      .uf-card-title {
        font-family: 'Syne', sans-serif;
        font-size: 1.6rem;
        font-weight: 700;
        letter-spacing: -.03em;
        margin-bottom: 6px;
        color: var(--uf-text);
      }
      .uf-card-sub {
        font-size: .875rem;
        color: var(--uf-muted);
      }
      .uf-card-sub a {
        color: var(--uf-accent);
        text-decoration: none;
        font-weight: 500;
      }
      .uf-card-sub a:hover { text-decoration: underline; }

      /* ── Google button ── */
      .uf-btn-google {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 15px 20px;
        background: var(--uf-input-bg);
        border: 1px solid var(--uf-border);
        border-radius: var(--uf-radius);
        color: var(--uf-text);
        font-family: 'DM Sans', sans-serif;
        font-size: .95rem;
        font-weight: 500;
        cursor: pointer;
        transition: border-color .2s, background .2s, transform .15s, box-shadow .2s;
      }
      .uf-btn-google:hover {
        border-color: rgba(232,255,71,.35);
        background: #1a1d26;
        transform: translateY(-2px);
        box-shadow: 0 8px 28px rgba(0,0,0,.3);
      }
      .uf-btn-google:active { transform: translateY(0); }
      .uf-btn-google svg { flex-shrink: 0; }

      /* ── Terms ── */
      .uf-terms {
        text-align: center;
        font-size: .73rem;
        color: var(--uf-muted);
        margin-top: 20px;
        line-height: 1.6;
      }
      .uf-terms a {
        color: var(--uf-muted);
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .uf-terms a:hover { color: var(--uf-text); }

      /* ── Responsive ── */
      @media (max-width: 800px) {
        .upfront-login { grid-template-columns: 1fr; height: auto; min-height: 100vh; }
        .uf-left { display: none; }
        .uf-right { min-height: 100vh; padding: 40px 24px; }
      }
    </style>

    <div class="upfront-login">

      <!-- Background -->
      <div class="uf-bg-canvas">
        <div class="uf-bg-grid"></div>
        <div class="uf-blob uf-blob-1"></div>
        <div class="uf-blob uf-blob-2"></div>
        <div class="uf-blob uf-blob-3"></div>
      </div>

      <!-- Left -->
      <div class="uf-left">
        <div class="uf-wordmark">
          <span class="uf-wordmark-dot"></span>
          Upfront
        </div>

        <div class="uf-hero">
          <div class="uf-hero-tag">No surprises. Ever.</div>
          <p class="uf-h1">Be <em>upfront</em> about everything.</p>
          <p class="uf-hero-sub">Transparent pricing, clear timelines, and honest communication — all in one place. Finally, a platform that says what it means.</p>
        </div>
      </div>

      <!-- Right -->
      <div class="uf-right">
        <div class="uf-card">
          <div class="uf-card-header">
            <div class="uf-card-title">Welcome back</div>
            <p class="uf-card-sub">No account? <a href="#">Start for free →</a></p>
          </div>

          <button class="uf-btn-google" (click)="loginWithGoogle()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p class="uf-terms">
            By signing in you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>

    </div>
  `
})
export class LoginComponent {
  constructor(private auth: AuthService) {}
  loginWithGoogle(): void { this.auth.loginWithGoogle(); }
}
