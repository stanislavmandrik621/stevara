# 🧠 AI Personal Knowledge Log - STEVARA Project

> **Purpose**: Track errors, solutions, best practices, and learnings to improve code quality and reduce mistakes.
> **Last Updated**: 2026-01-21

---

## 📋 Table of Contents

1. [Pre-Flight Checklists](#-pre-flight-checklists)
2. [Errors & Solutions Log](#-errors--solutions-log)
3. [Best Practices Learned](#-best-practices-learned)
4. [Official Documentation References](#-official-documentation-references)
5. [Project-Specific Knowledge](#-project-specific-knowledge)
6. [Security Considerations](#-security-considerations)
7. [Performance Optimizations](#-performance-optimizations)

---

## ✈️ Pre-Flight Checklists

### Before Running Any Command
- [ ] Check if process is already running (check terminals folder)
- [ ] Verify correct working directory
- [ ] Check for required permissions (network, git_write, etc.)
- [ ] Verify package manager (npm vs pnpm vs yarn)

### Before Creating a New Project
- [ ] Check latest stable versions of frameworks (search web)
- [ ] Review security advisories (CVEs)
- [ ] Verify directory name conventions (no capitals for npm)
- [ ] Check if directory exists and is empty

### Before Installing Dependencies
- [ ] Verify package names are correct
- [ ] Check for deprecated packages
- [ ] Review peer dependency requirements
- [ ] Use correct package manager for the project

### Before Writing Components
- [ ] Read existing code patterns in the project
- [ ] Check for existing utilities/helpers
- [ ] Verify import paths are correct
- [ ] Follow project's naming conventions

### Before Making API/Network Calls
- [ ] Request network permissions
- [ ] Handle loading/error states
- [ ] Add proper TypeScript types

---

## 🐛 Errors & Solutions Log

### Error #1: NPM Naming Restrictions
**Date**: 2026-01-18
**Error**: `Could not create a project called "Stevara" because of npm naming restrictions: name can no longer contain capital letters`
**Cause**: Attempted to create Next.js project in a directory with capital letters
**Solution**: Create a subdirectory with lowercase name (e.g., `web/`)
**Prevention**: Always use lowercase directory names for npm/node projects

---

### Error #2: Deprecated Package Warning
**Date**: 2026-01-18
**Warning**: `@studio-freight/lenis@1.0.42: The '@studio-freight/lenis' package has been renamed to 'lenis'`
**Cause**: Used old package name
**Solution**: Use `lenis` instead of `@studio-freight/lenis`
**Prevention**: Always check npm for package name changes before installing

---

### Error #3: Binary File Read Attempt
**Date**: 2026-01-18
**Error**: `File seems to be binary and cannot be opened as text` for .docx files
**Cause**: Attempted to read binary .docx files with text reader
**Solution**: Use `textutil -convert txt` on macOS to convert to text first
**Prevention**: Check file extension before reading; .docx, .pdf, etc. are binary

---

### Error #4: Dev Server Exits Immediately
**Date**: 2026-01-18
**Error**: `Connection Failed - ERR_CONNECTION_REFUSED` in browser despite "Ready in 681ms" message
**Cause**: Dev server started but exited immediately (shell prompt `$` appeared after "Ready")
**Symptoms**: 
- Terminal shows "Ready in 681ms" 
- Then immediately shows `$` prompt
- Browser cannot connect
**Solution**: 
1. Check if server process is still running (look for `$` prompt = exited)
2. Run with `2>&1` to capture all output
3. Run as background process with `is_background: true`
4. Wait a few seconds and check terminal log file
**Prevention**: 
- Always verify server is still running by checking terminal log
- Look for `$` prompt after server start = server died
- Check for compilation errors in full output

---

### Error #5: Environment HDR Failed to Fetch
**Date**: 2026-01-19
**Error**: `Could not load potsdamer_platz_1k.hdr: Failed to fetch`
**Component**: `@react-three/drei` Environment component with preset
**Cause**: The `<Environment preset="city" />` tries to load external HDR files from a CDN which may be blocked or fail
**Solution**: 
1. Remove the Environment component with presets
2. Use custom lighting setup instead (ambient, directional, point lights)
3. Or download HDR files locally to `/public` and reference them
**Prevention**: 
- Avoid using external HDR presets in production
- Use comprehensive lighting setup as alternative
- Test with network throttling to catch these issues early

---

### Learning #1: Tesla Powerwall 3 Accurate Specifications
**Date**: 2026-01-19
**Topic**: Product Design Research
**Details**:
- **Dimensions**: 43.5" × 24" × 7.6" (H × W × D) - ratio ~1.8:1:0.32
- **Colors**: White/silver body, matte/satin finish
- **Front**: Glass panel with subtle Tesla "T" logo (arc + T shape)
- **Status**: Green LED indicator at bottom right
- **Design**: Minimalist, premium, clean lines
- **Reference**: tesla.com/powerwall, energylibrary.tesla.com

### Learning #2: Tesla Megapack Design
**Date**: 2026-01-19
**Topic**: Product Design Research
**Details**:
- Large industrial white rectangular containers
- Ventilation grilles on sides
- Multiple units shown in grid formation
- Industrial/desert setting typical for marketing

### Learning #3: 3D Model Resources
**Date**: 2026-01-19
**Topic**: Asset Sources
**Free/Paid Sources**:
- Sketchfab: sketchfab.com/search?q=tesla+powerwall
- TurboSquid: Various Tesla models ($10-$30)
- Free3D: free3d.com/3d-model/tesla-powerwall-triple-unit-2964.html
- BIMobject: Official BIM models for architecture (bimobject.com)
- 3D Warehouse: SketchUp compatible models
**Note**: Free models require login to download; procedural models work well as alternative

---

## 📚 Best Practices Learned

### Next.js 16.x (January 2026)

1. **Security-First Approach**
   - Always use patched versions (16.0.10+ for Next.js, 19.0.1+ for React)
   - Check for CVEs before starting new projects
   - App Router has different security considerations than Pages Router

2. **File Structure**
   ```
   src/
   ├── app/           # App Router pages
   ├── components/    # Reusable components
   │   ├── ui/        # Basic UI components
   │   ├── layout/    # Layout components
   │   ├── three/     # 3D/WebGL components
   │   └── providers/ # Context providers
   ├── hooks/         # Custom hooks
   ├── lib/           # Utilities
   └── store/         # State management
   ```

3. **Dynamic Imports for 3D**
   - Always use `dynamic()` with `{ ssr: false }` for Three.js components
   - This prevents server-side rendering issues with WebGL

4. **Metadata**
   - Use the Metadata API for SEO
   - Include Open Graph tags
   - Use template for title inheritance

### Three.js / React Three Fiber

1. **Performance**
   - Use `dpr={[1, 2]}` for responsive pixel ratio
   - Enable `powerPreference: "high-performance"` in gl settings
   - Use `<Suspense>` for loading states
   - Use `<Preload all />` for asset preloading

2. **Memory Management**
   - Dispose of geometries and materials when unmounting
   - Use refs for animations instead of state
   - Limit particle counts on mobile

### Framer Motion / GSAP

1. **Scroll Animations**
   - Use `viewport={{ once: true }}` for one-time animations
   - GSAP ScrollTrigger needs `gsap.registerPlugin(ScrollTrigger)`
   - Clean up GSAP context on unmount: `return () => ctx.revert()`

2. **Performance**
   - Prefer CSS transforms over layout properties
   - Use `will-change` sparingly
   - Batch animations when possible

### Tailwind CSS v4

1. **New Features**
   - Uses CSS imports: `@import "tailwindcss"`
   - No config file needed for basic setup
   - CSS variables via `@theme inline`
   - Native container queries support

---

## 📖 Official Documentation References

### Critical Security (CHECK BEFORE EVERY PROJECT)

| Framework | Security Page | Latest Safe Version |
|-----------|--------------|---------------------|
| Next.js | https://nextjs.org/blog/security | 16.0.10+ |
| React | https://react.dev/blog | 19.0.1+, 19.1.2+, 19.2.1+ |

### Framework Documentation

| Technology | Official Docs | Key Pages |
|------------|--------------|-----------|
| Next.js 16 | https://nextjs.org/docs | App Router, Metadata, Image |
| React 19 | https://react.dev | Server Components, Hooks |
| Three.js | https://threejs.org/docs | Getting Started |
| R3F | https://r3f.docs.pmnd.rs | Canvas, Hooks |
| Drei | https://drei.docs.pmnd.rs | Components |
| GSAP | https://gsap.com/docs | ScrollTrigger |
| Framer Motion | https://motion.dev | Animation, Gestures |
| Tailwind v4 | https://tailwindcss.com | New in v4 |
| Lenis | https://github.com/darkroomengineering/lenis | Setup |

---

## 🏗️ Project-Specific Knowledge

### STEVARA Project Structure

```
/Users/stanislavmandrik/Stevara/
├── ToR/                    # Requirements documents
│   ├── content.txt         # Content for all pages (Ukrainian)
│   ├── visual.txt          # Visual direction guidelines
│   └── technical.txt       # Technical specifications
├── web/                    # Next.js application
│   ├── src/
│   │   ├── app/           # 6 pages: home, about, powerwall, megapack, financing, contacts
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
│   └── package.json       # pnpm, Next 16.1.3, React 19.2.3
└── .cursor/
    └── AI_KNOWLEDGE_LOG.md # This file
```

### Design System

- **Theme**: Dark mode primary (Tesla-inspired)
- **Colors**: 
  - Background: `#000000`
  - Accent: `#00d4ff` (electric cyan)
  - Energy: `#22c55e` (green)
  - Power: `#f97316` (orange)
- **Font**: Outfit (Google Fonts)
- **Animations**: GSAP ScrollTrigger + Framer Motion

### Ukrainian Language

- Site language: Ukrainian (`uk`)
- Content encoding: UTF-8
- CTA buttons use Ukrainian text

---

## 🔒 Security Considerations

### Critical CVEs (December 2025)

| CVE | Severity | Description | Fixed In |
|-----|----------|-------------|----------|
| CVE-2025-55182 | CRITICAL (10.0) | React2Shell RCE in RSC | React 19.0.1+ |
| CVE-2025-55183 | HIGH | Source Code Exposure | Next 16.0.10+ |
| CVE-2025-55184 | HIGH | DoS via infinite loops | Next 16.0.10+ |
| CVE-2025-67779 | HIGH | Incomplete patch fix | Next 16.0.10+ |
| CVE-2025-29927 | HIGH | Middleware Auth Bypass | Next 15.2.3+ |

### Security Checklist

- [ ] Using patched Next.js version (≥16.0.10)
- [ ] Using patched React version (≥19.0.1)
- [ ] No secrets in client-side code
- [ ] Form validation (client + server)
- [ ] CSRF protection on forms
- [ ] Rate limiting on API routes

---

## ⚡ Performance Optimizations

### Implemented

- [x] Dynamic imports for Three.js (SSR disabled)
- [x] Image optimization (Next.js Image component)
- [x] Lazy loading for below-fold content
- [x] CSS variables for theming
- [x] Smooth scroll with Lenis

### To Consider

- [ ] Bundle analysis
- [ ] Code splitting per route
- [ ] Service worker for caching
- [ ] Preconnect to external domains
- [ ] Font subsetting

---

## 📝 Notes & Reminders

1. **Always read terminal output** - Check for warnings even on successful commands
2. **Check deprecated packages** - npm/pnpm will warn about renamed packages
3. **Test on mobile** - Three.js can be heavy; reduce particles for mobile
4. **Ukrainian encoding** - Ensure UTF-8 for all files with Ukrainian text
5. **Git commits** - Make meaningful commits after each major feature

---

## 🔄 Update Log

| Date | What Changed | Reason |
|------|-------------|--------|
| 2026-01-18 | Initial creation | Project setup |
| 2026-01-18 | Added CVE info | Security awareness |
| 2026-01-18 | Added error logs | Learning from mistakes |
| 2026-01-21 | Added Tesla Energy feature sections | Home page content expansion |
| 2026-01-21 | Animated hero stats + reduced copy | Improve clarity and minimalism |
| 2026-01-21 | Refined official highlights styling | Improve hierarchy and contrast |

---

> **Remember**: Before running commands, always check:
> 1. Is it the right directory?
> 2. Is the right tool/package being used?
> 3. Are there any known issues/CVEs?
> 4. What's the expected outcome?
