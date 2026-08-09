import {
  ArrowUpRight,
  BadgeCheck,
  Cloud,
  ExternalLink,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Menu,
  PanelTopOpen,
  Play,
  Send,
  Sparkles,
  X,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import cyberpunkHero from "./assets/cyberpunk-xr-lab.webp";
import {
  certifications,
  education,
  profile,
  projects,
  selectedExperience,
  skillCategories,
  type ProjectLink,
} from "./portfolioData";

const HeroScene = lazy(() => import("./components/HeroScene"));

const linkIconMap: Record<ProjectLink["kind"], LucideIcon> = {
  drive: Cloud,
  external: ExternalLink,
  github: Github,
  youtube: Youtube,
};

const focusTags = [
  "AI/ML",
  "XR",
  "Full-Stack",
  "R&D prototypes",
  "Computer vision",
  "Data systems",
  "3D interfaces",
  "DevOps",
];

const heroHeadline = "Geoffrey Lazer";
const heroSubheadline =
  "Building intelligent + interactive software systems.";
const heroTags = [
  "AI/ML Engineer",
  "XR Developer",
  "Full-Stack Developer",
  "Research Prototyper",
  "Applied ML",
  "Interactive Systems",
];
const educationFocusChips = [
  "Multimedia Systems",
  "AI/ML",
  "CV",
  "XR",
  "3D Visualization",
  "R&D Prototypes",
];
const heroSignals = [
  { value: "MSc", label: "Computing Science" },
  { value: "R&D", label: "Prototype to product" },
  { value: "SWE", label: "Production systems" },
];
const heroProjectSignals = ["Applied ML", "XR Interfaces", "Full-Stack"];
const heroSystemLabels = [
  { code: "AI/ML", label: "Core" },
  { code: "XR", label: "Interface" },
  { code: "FS", label: "Full-Stack Layer" },
  { code: "3D", label: "Pipeline" },
  { code: "R&D", label: "Systems" },
  { code: "AI", label: "Applied Intelligence" },
];
const projectAccentPalette = [
  "#19e6ff",
  "#ffb86b",
  "#7cff9d",
  "#ff4fd8",
  "#8a7cff",
  "#f6ff7a",
];
const featuredProjectTitles = [
  "NFRF Mixed-Reality Ergonomics Platform",
  "Formwork Safety VR",
  "Volume Rendering & 3D Slicing for Medical Imaging",
  "Agricultural Terrain Visualization",
  "Domain Adaptive Learning for Water Body Extraction",
  "Intelligent Garbage Classification using Deep Learning",
];

const moreProjectPriorityTitles = [
  "Helex VR",
  "Shinyonaika 2D - Graphic Novel",
  "MediAssist",
];

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];
const footerNavItems = navItems;
const activeSectionIds = navItems.map((item) => item.id);
let navScrollFrame: number | null = null;
let savedScrollBehavior: string | null = null;

function scrollToNavTarget(target: HTMLElement, prefersReducedMotion: boolean) {
  if (navScrollFrame !== null) {
    window.cancelAnimationFrame(navScrollFrame);
    navScrollFrame = null;
  }

  const root = document.documentElement;
  if (savedScrollBehavior === null) {
    savedScrollBehavior = root.style.scrollBehavior;
  }

  root.style.scrollBehavior = "auto";
  const scrollPadding = Number.parseFloat(window.getComputedStyle(root).scrollPaddingTop) || 138;
  const maxScroll = root.scrollHeight - window.innerHeight;
  const targetTop = Math.max(
    0,
    Math.min(maxScroll, target.getBoundingClientRect().top + window.scrollY - scrollPadding),
  );

  if (prefersReducedMotion) {
    window.scrollTo({ top: targetTop, left: 0, behavior: "auto" });
    root.style.scrollBehavior = savedScrollBehavior ?? "";
    savedScrollBehavior = null;
    return;
  }

  const startTop = window.scrollY;
  const distance = targetTop - startTop;
  const duration = Math.min(780, Math.max(360, Math.abs(distance) * 0.08));
  const startTime = window.performance.now();
  const easeOutCubic = (time: number) => 1 - Math.pow(1 - time, 3);

  const restoreScrollBehavior = () => {
    root.style.scrollBehavior = savedScrollBehavior ?? "";
    savedScrollBehavior = null;
    navScrollFrame = null;
  };

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo({ top: startTop + distance * easeOutCubic(progress), left: 0, behavior: "auto" });

    if (progress < 1) {
      navScrollFrame = window.requestAnimationFrame(step);
      return;
    }

    restoreScrollBehavior();
  };

  navScrollFrame = window.requestAnimationFrame(step);
}

function getHashSection() {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "");
  return activeSectionIds.includes(hash) ? hash : "home";
}

function revealAnchoredSection(target: HTMLElement) {
  target.classList.add("is-visible");
  target.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
}

function useCyberInteractions() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const canUsePointerEffects =
      !reduceMotionQuery.matches &&
      !coarsePointerQuery.matches &&
      window.innerWidth >= 1120 &&
      (navigator.hardwareConcurrency ?? 8) >= 6;
    const tiltElements = canUsePointerEffects
      ? Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"))
      : [];
    const magneticElements = canUsePointerEffects
      ? Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"))
      : [];
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let globalPointerFrame: number | null = null;
    let scrollFrame: number | null = null;
    let latestPointer: PointerEvent | null = null;

    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      root.style.setProperty("--scroll-progress", `${progress}`);
    };

    const requestScrollProgress = () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = null;
        updateScrollProgress();
      });
    };

    const applyGlobalPointer = () => {
      if (!latestPointer) return;

      root.style.setProperty("--pointer-x", `${latestPointer.clientX}px`);
      root.style.setProperty("--pointer-y", `${latestPointer.clientY}px`);
      const safeWidth = Math.max(window.innerWidth, 1);
      const safeHeight = Math.max(window.innerHeight, 1);
      const normalizedX = latestPointer.clientX / safeWidth - 0.5;
      const normalizedY = latestPointer.clientY / safeHeight - 0.5;
      root.style.setProperty("--pointer-pan-x", `${normalizedX * 22}px`);
      root.style.setProperty("--pointer-pan-y", `${normalizedY * 16}px`);
      globalPointerFrame = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      latestPointer = event;
      if (globalPointerFrame !== null) return;
      globalPointerFrame = window.requestAnimationFrame(applyGlobalPointer);
    };

    const cleanups = tiltElements.map((element) => {
      const handleTiltMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        element.style.setProperty("--hot-x", `${x * 100}%`);
        element.style.setProperty("--hot-y", `${y * 100}%`);
        element.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
        element.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
        element.classList.add("is-armed");
      };

      const handleTiltLeave = () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
        element.style.setProperty("--hot-x", "50%");
        element.style.setProperty("--hot-y", "50%");
        element.classList.remove("is-armed");
      };

      element.addEventListener("pointermove", handleTiltMove);
      element.addEventListener("pointerleave", handleTiltLeave);
      return () => {
        element.removeEventListener("pointermove", handleTiltMove);
        element.removeEventListener("pointerleave", handleTiltLeave);
      };
    });

    const magneticCleanups = magneticElements.map((element) => {
      const handleMagneticMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--magnetic-x", `${x * 12}px`);
        element.style.setProperty("--magnetic-y", `${y * 8}px`);
        element.classList.add("is-magnetic");
      };

      const handleMagneticLeave = () => {
        element.style.setProperty("--magnetic-x", "0px");
        element.style.setProperty("--magnetic-y", "0px");
        element.classList.remove("is-magnetic");
      };

      element.addEventListener("pointermove", handleMagneticMove);
      element.addEventListener("pointerleave", handleMagneticLeave);
      return () => {
        element.removeEventListener("pointermove", handleMagneticMove);
        element.removeEventListener("pointerleave", handleMagneticLeave);
      };
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));
    updateScrollProgress();
    if (canUsePointerEffects) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }
    window.addEventListener("scroll", requestScrollProgress, { passive: true });
    window.addEventListener("resize", requestScrollProgress);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      magneticCleanups.forEach((cleanup) => cleanup());
      observer.disconnect();
      if (globalPointerFrame !== null) {
        window.cancelAnimationFrame(globalPointerFrame);
      }
      if (scrollFrame !== null) {
        window.cancelAnimationFrame(scrollFrame);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", requestScrollProgress);
      window.removeEventListener("resize", requestScrollProgress);
    };
  }, []);
}

function useInitialHashScroll() {
  useEffect(() => {
    const scrollToCurrentHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!activeSectionIds.includes(hash)) return;

      const target = document.getElementById(hash);
      if (!target) return;

      revealAnchoredSection(target);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scrollToNavTarget(target, prefersReducedMotion);
    };

    const timers: number[] = [];
    const queueScroll = (delay: number) => {
      timers.push(window.setTimeout(scrollToCurrentHash, delay));
    };
    const handleHashChange = () => {
      [0, 260, 900, 1800].forEach(queueScroll);
    };
    const handleLoad = () => queueScroll(140);

    [80, 360, 900, 1800, 3200, 5200].forEach(queueScroll);
    if (document.readyState === "complete") {
      queueScroll(140);
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState(getHashSection);

  useEffect(() => {
    let frame: number | null = null;
    let lastActive = getHashSection();

    const updateActiveSection = () => {
      frame = null;
      let nextActive: string | null = null;

      if (window.scrollY < window.innerHeight * 0.45) {
        nextActive = "home";
      } else {
        const viewportAnchor = window.innerHeight * 0.32;
        nextActive = activeSectionIds.reduce<string | null>((match, id) => {
          const section = document.getElementById(id);
          if (!section) return match;
          const rect = section.getBoundingClientRect();
          if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
            return id;
          }
          return match;
        }, null);
      }

      if (nextActive && nextActive !== lastActive) {
        lastActive = nextActive;
        setActiveSection(nextActive);
      }
    };

    const requestActiveSectionUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    const hashSync = window.setTimeout(requestActiveSectionUpdate, 160);
    const lateHashSync = window.setTimeout(requestActiveSectionUpdate, 700);
    window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
    window.addEventListener("hashchange", requestActiveSectionUpdate);

    return () => {
      window.clearTimeout(hashSync);
      window.clearTimeout(lateHashSync);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestActiveSectionUpdate);
      window.removeEventListener("hashchange", requestActiveSectionUpdate);
    };
  }, []);

  return activeSection;
}

function useMediaQuery(query: string, initialValue = false) {
  const [matches, setMatches] = useState(initialValue);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);

    updateMatches();
    media.addEventListener("change", updateMatches);
    return () => media.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

function useNearViewport<T extends HTMLElement>(rootMargin = "720px 0px") {
  const elementRef = useRef<T | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    if (isNearViewport) return;
    const element = elementRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isNearViewport, rootMargin]);

  return [elementRef, isNearViewport] as const;
}

function getProjectVisualKey(title: string, category: string) {
  const source = `${title} ${category}`.toLowerCase();
  if (source.includes("wildfire")) return "wildfire";
  if (source.includes("medical") || source.includes("dicom") || source.includes("volume")) return "medical";
  if (source.includes("terrain") || source.includes("geo") || source.includes("water") || source.includes("remote")) {
    return "geospatial";
  }
  if (source.includes("cycle") || source.includes("night") || source.includes("vision")) return "vision";
  if (source.includes("glucose") || source.includes("reinforcement")) return "ml";
  if (source.includes("shinyonaika") || source.includes("story")) return "narrative";
  if (source.includes("vr") || source.includes("xr")) return "xr";
  return "systems";
}

function ProjectVisual({
  image,
  gallery,
  videos,
  videoPoster,
  youtube,
  title,
  category,
  eager = false,
}: {
  image?: string;
  gallery?: string[];
  videos?: string[];
  videoPoster?: string;
  youtube?: { id: string; title: string };
  title: string;
  category: string;
  eager?: boolean;
}) {
  const visualKey = getProjectVisualKey(title, category);
  const [mediaRef, isNearViewport] = useNearViewport<HTMLDivElement>();
  const isMobilePreview = useMediaQuery("(max-width: 760px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const shouldLoadStaticMedia = eager || (isNearViewport && !isMobilePreview);
  const shouldLoadMotionMedia = eager || (isNearViewport && !isMobilePreview && !prefersReducedMotion);
  const isAnimatedImage = image?.toLowerCase().includes(".gif") ?? false;

  const placeholder = (extraClass = "") => (
    <div
      ref={mediaRef}
      className={`project-visual is-deferred${extraClass ? ` ${extraClass}` : ""}`}
      data-visual={visualKey}
      aria-hidden="true"
    >
      <span className="visual-plane" />
      <span className="visual-orb" />
      <span className="visual-node" />
      <span className="visual-line" />
      <span className="visual-line" />
      <span className="visual-line" />
    </div>
  );

  if (youtube) {
    if (!shouldLoadStaticMedia) {
      return placeholder("has-youtube");
    }

    return (
      <div ref={mediaRef} className="project-visual has-media has-youtube" data-visual={visualKey}>
        <img
          src={`https://img.youtube.com/vi/${youtube.id}/hqdefault.jpg`}
          alt={`${youtube.title} video preview`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(event) => {
            event.currentTarget.closest(".project-visual")?.classList.remove("has-media");
            event.currentTarget.remove();
          }}
        />
        <span className="project-youtube-play" aria-hidden="true">
          <Youtube size={22} />
        </span>
      </div>
    );
  }

  if (videos?.length) {
    if (videoPoster && !eager) {
      if (!shouldLoadStaticMedia) {
        return placeholder("has-video");
      }

      return (
        <div ref={mediaRef} className="project-visual has-media has-video-poster" data-visual={visualKey}>
          <img src={videoPoster} alt={`${title} video preview`} loading="lazy" decoding="async" />
          <span className="project-youtube-play" aria-hidden="true">
            <Play size={20} fill="currentColor" />
          </span>
        </div>
      );
    }

    if (!shouldLoadMotionMedia) {
      return placeholder("has-video");
    }

    return (
      <div ref={mediaRef} className="project-visual has-media" data-visual={visualKey}>
        <div className={`project-video-grid${videos.length > 1 ? " has-pair" : ""}`}>
          {videos.map((video) => (
            <video
              key={video}
              src={video}
              poster={videoPoster}
              aria-label={`${title} preview clip`}
              autoPlay={!eager}
              muted
              loop={!eager}
              playsInline
              controls={eager}
              preload={eager ? "metadata" : "none"}
              onError={(event) => {
                event.currentTarget.remove();
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (gallery?.length) {
    if (!shouldLoadStaticMedia) {
      return placeholder("has-gallery");
    }

    const previewItems = gallery.slice(0, isMobilePreview && !eager ? 2 : 4);

    return (
      <div ref={mediaRef} className="project-visual has-media has-gallery" data-visual={visualKey}>
        <div className={`project-gallery-grid${previewItems.length > 1 ? " has-grid" : ""}`}>
          {previewItems.map((item, itemIndex) => (
            <img
              key={item}
              src={item}
              alt={`${title} visual ${itemIndex + 1}`}
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.remove();
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (image) {
    if (!shouldLoadStaticMedia || (isAnimatedImage && !eager)) {
      return placeholder("has-image");
    }

    return (
      <div ref={mediaRef} className="project-visual has-media" data-visual={visualKey}>
        <img
          src={image}
          alt={`${title} preview`}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.closest(".project-visual")?.classList.remove("has-media");
            event.currentTarget.remove();
          }}
        />
      </div>
    );
  }

  return (
    <div className="project-visual" data-visual={visualKey} aria-hidden="true">
      <span className="visual-plane" />
      <span className="visual-orb" />
      <span className="visual-node" />
      <span className="visual-line" />
      <span className="visual-line" />
      <span className="visual-line" />
    </div>
  );
}

function handleHashScrollClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  afterClick?: () => void,
) {
  if (event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  const target = document.getElementById(href.replace("#", ""));
  if (!target) {
    afterClick?.();
    return;
  }

  event.preventDefault();
  afterClick?.();
  revealAnchoredSection(target);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.history.pushState(null, "", href);
  scrollToNavTarget(target, prefersReducedMotion);
}

function HeroSceneStaticFallback() {
  return (
    <div className="hero-scene hero-scene-mobile-static is-static" aria-hidden="true">
      <div className="hero-scene-fallback" aria-hidden="true">
        <span className="hero-fallback-core" />
        <span className="hero-fallback-body" />
        <span className="hero-fallback-arm hero-fallback-arm-left" />
        <span className="hero-fallback-arm hero-fallback-arm-right" />
        <span className="hero-fallback-leg hero-fallback-leg-left" />
        <span className="hero-fallback-leg hero-fallback-leg-right" />
        <span className="hero-fallback-ring hero-fallback-ring-one" />
        <span className="hero-fallback-ring hero-fallback-ring-two" />
        <span className="hero-fallback-node hero-fallback-node-one" />
        <span className="hero-fallback-node hero-fallback-node-two" />
        <span className="hero-fallback-node hero-fallback-node-three" />
      </div>
    </div>
  );
}

function Header({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${menuOpen ? " is-menu-open" : ""}`}>
      <a
        className="brand-mark"
        href="#home"
        aria-label={`${profile.name} home`}
        onClick={(event) => handleHashScrollClick(event, "#home", closeMenu)}
        data-tilt
      >
        <span>Geoff.</span>
      </a>

      <button
        className="mobile-menu-toggle"
        type="button"
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
      </button>

      <nav
        className="nav-links"
        id="primary-navigation"
        aria-label="Primary navigation"
        data-open={menuOpen ? "true" : "false"}
      >
        {navItems.map((item) => (
          <a
            className={activeSection === item.id ? "is-active" : undefined}
            href={item.href}
            key={item.id}
            aria-current={activeSection === item.id ? "page" : undefined}
            onClick={(event) => handleHashScrollClick(event, item.href, closeMenu)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
  compact = false,
}: {
  project: (typeof projects)[number];
  index: number;
  onOpen: () => void;
  compact?: boolean;
}) {
  const accent = projectAccentPalette[index % projectAccentPalette.length];
  const visibleBullets = project.bullets.slice(0, compact ? 1 : 2);
  const visibleTags = project.tags.slice(0, compact ? 4 : project.tags.length);

  return (
    <article
      className={`project-card reveal${compact ? " project-card-compact" : ""}`}
      style={
        {
          "--project-accent": accent,
          "--reveal-delay": `${Math.min(index, 5) * 70}ms`,
        } as CSSProperties & Record<string, string>
      }
      data-tilt
    >
      <ProjectVisual
        image={project.image}
        gallery={project.gallery}
        videos={project.videos}
        videoPoster={project.videoPoster}
        youtube={project.youtube}
        title={project.title}
        category={project.category}
      />
      <div className="project-body">
        <div className="project-meta">
          <p className="project-category">{project.category}</p>
          <span>{project.date}</span>
        </div>
        <h3>{project.title}</h3>
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="project-summary">{project.text}</p>
        <ul className="project-bullets">
          {visibleBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className="tag-list" aria-label={`${project.title} tags`}>
          {visibleTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.links && (
          <div className="project-links project-card-links" aria-label={`${project.title} links`}>
            {project.links.slice(0, compact ? 1 : 2).map((link) => {
              const Icon = linkIconMap[link.kind];
              return (
                <a className="link-pill" href={link.href} key={link.href} target="_blank" rel="noreferrer">
                  <Icon aria-hidden="true" size={15} />
                  {link.label}
                  <ArrowUpRight aria-hidden="true" size={13} />
                </a>
              );
            })}
          </div>
        )}
        <button className="project-open-button" type="button" onClick={onOpen}>
          <PanelTopOpen aria-hidden="true" size={17} />
          View details
        </button>
      </div>
    </article>
  );
}

function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: (typeof projects)[number];
  index: number;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isClosingRef.current = true;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(onClose, prefersReducedMotion ? 0 : 220);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
      previouslyFocusedElement?.focus({ preventScroll: true });
    };
  }, [requestClose]);

  const detailItems = [
    {
      label: "Problem",
      text: project.details?.problem ?? project.text,
    },
    {
      label: "What I built",
      text: project.details?.built ?? project.bullets[0] ?? project.text,
    },
    {
      label: "Technical approach",
      text: project.details?.approach ?? project.bullets.slice(0, 2).join(" "),
    },
    {
      label: "My role",
      text: project.details?.role ?? "Contributed to the design, implementation, and technical direction of the prototype.",
    },
    {
      label: "Impact or outcome",
      text: project.details?.impact ?? "Produced a working prototype that made the underlying technical idea easier to evaluate and communicate.",
    },
  ];

  return (
    <div
      className="modal-layer"
      data-state={isClosing ? "closing" : "open"}
      aria-label="Project details overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          requestClose();
        }
      }}
    >
      <section
        ref={modalRef}
        className="project-modal"
        data-state={isClosing ? "closing" : "open"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-summary"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          type="button"
          onClick={requestClose}
          aria-label={`Close details for ${project.title}`}
        >
          <X aria-hidden="true" size={20} />
        </button>

        <div className="modal-visual">
          <ProjectVisual
            image={project.image}
            gallery={project.gallery}
            videos={project.videos}
            videoPoster={project.videoPoster}
            youtube={project.youtube}
            title={project.title}
            category={project.category}
            eager
          />
          <div className="modal-number">{String(index + 1).padStart(2, "0")}</div>
        </div>

        <div className="modal-content">
          <div className="project-meta">
            <p className="project-category">{project.category}</p>
            <span>{project.date}</span>
          </div>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className="modal-summary" id="project-modal-summary">
            {project.text}
          </p>

          {project.youtube && (
            <div className="project-video-embed" aria-label={`${project.title} video demo`}>
              <iframe
                title={project.youtube.title}
                src={`https://www.youtube-nocookie.com/embed/${project.youtube.id}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}

          {project.gallery?.length ? (
            <div className="project-modal-gallery" aria-label={`${project.title} image gallery`}>
              {project.gallery.map((item, itemIndex) => (
                <img
                  key={item}
                  src={item}
                  alt={`${project.title} gallery visual ${itemIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          ) : null}

          <div className="project-detail-grid" aria-label={`${project.title} case study details`}>
            {detailItems.map((item) => (
              <article className="project-detail-block" key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </article>
            ))}
            <article className="project-detail-block stack-block">
              <h3>Tech stack</h3>
              <div className="tag-list modal-tags" aria-label={`${project.title} tags`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          </div>
          {project.links && (
            <div className="project-links modal-links" aria-label={`${project.title} links`}>
              {project.links.map((link) => {
                const Icon = linkIconMap[link.kind];
                return (
                  <a className="link-pill" href={link.href} key={link.href} target="_blank" rel="noreferrer">
                    <Icon aria-hidden="true" size={16} />
                    {link.label}
                    <ArrowUpRight aria-hidden="true" size={14} />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SelectedExperienceCard({
  role,
  index,
}: {
  role: (typeof selectedExperience)[number];
  index: number;
}) {
  return (
    <article
      className="experience-card selected-experience-card reveal"
      style={
        {
          "--experience-accent": role.accent,
          "--reveal-delay": `${Math.min(index, 4) * 85}ms`,
        } as CSSProperties & Record<string, string>
      }
      data-tilt
    >
      <div className="experience-marker">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div className="experience-logo-mark" aria-label={`${role.company} visual marker`}>
          <span>{role.initials}</span>
          {role.logo && (
            <img
              src={role.logo}
              alt={role.logoAlt ?? `${role.company} logo`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
        <p>{role.visualLabel}</p>
      </div>

      <div className="experience-content">
        <div className="experience-topline">
          <span>{role.signal}</span>
          <time>{role.date}</time>
        </div>
        <h3>{role.title}</h3>
        <p className="experience-location">
          {role.company} · {role.location}
        </p>
        <p className="experience-summary">{role.text}</p>
        <ul className="experience-bullets">
          {role.bullets.map((bullet) => (
            <li key={bullet}>
              <BadgeCheck aria-hidden="true" size={15} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="tag-list experience-tags" aria-label={`${role.company} focus areas`}>
          {role.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function EducationSection() {
  return (
    <section className="education-panel reveal is-visible" id="education" aria-labelledby="education-title">
      <div className="education-panel-glow" aria-hidden="true" />
      <div className="education-node-field" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="education-intro">
        <p className="eyebrow">Education</p>
        <h2 id="education-title">Academic Education</h2>
        <p>
          Computing science training shaped by multimedia systems, AI/ML, and R&amp;D software.
        </p>
        <div className="education-focus-chips" aria-label="Education focus areas">
          {educationFocusChips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>

      <div className="education-card-stack" aria-label="Academic history">
        {education.map((item, index) => (
          <article
            className="education-item reveal"
            key={item.school}
            style={
              {
                "--education-accent": item.accent,
                "--reveal-delay": `${index * 80}ms`,
              } as CSSProperties & Record<string, string>
            }
            data-tilt
          >
            <div className="education-icon-frame" aria-hidden="true">
              {item.logo ? (
                <img src={item.logo} alt="" loading="lazy" decoding="async" />
              ) : (
                <span>{item.initials}</span>
              )}
            </div>
            <div className="education-card-copy">
              <h3>{item.credential}</h3>
              <p>{item.school}</p>
            </div>
            <time className="education-date">{item.date}</time>
          </article>
        ))}
      </div>
    </section>
  );
}

function TechnicalStackSection() {
  return (
    <section className="page-section technical-stack-page reveal" id="skills" aria-labelledby="skills-title">
      <div className="section-heading wide">
        <p className="eyebrow">Technical Stack</p>
        <h2 id="skills-title">AI/ML x XR x Full-Stack toolkit.</h2>
      </div>

      <div className="stack-orbit-panel">
        <div className="stack-core" aria-label="Core technical identity">
          <span>Models x interfaces x production systems</span>
          <p>Research signals → usable software</p>
        </div>

        <div className="stack-category-grid">
          {skillCategories.map((category) => (
            <article
              className="stack-category-card reveal"
              key={category.title}
              style={{ "--stack-accent": category.accent } as CSSProperties & Record<string, string>}
              data-tilt
            >
              <div className="stack-category-header">
                <div>
                  <p>{category.signal}</p>
                  <h3>{category.title}</h3>
                </div>
                <span>{category.skills.length} tools</span>
              </div>
              <p className="stack-category-summary">{category.summary}</p>
              <div className="stack-chip-cloud" aria-label={`${category.title} tools`}>
                {category.skills.map((skill, skillIndex) => (
                  <span
                    className="stack-chip"
                    key={skill.name}
                    style={{ "--chip-order": skillIndex } as CSSProperties & Record<string, number>}
                  >
                    <span className="stack-chip-mark" aria-hidden="true">
                      {skill.logo ? (
                        <img src={skill.logo} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                      ) : (
                        skill.mark ?? skill.name.slice(0, 2).toUpperCase()
                      )}
                    </span>
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="learning-panel reveal" aria-labelledby="learning-title">
          <div className="learning-heading">
            <p className="eyebrow">Certifications</p>
            <h3 id="learning-title">Certifications + Learning</h3>
          </div>
          <div className="learning-chip-grid">
            {certifications.map((certification) => (
              <article className="learning-chip" key={certification} data-tilt>
                <BadgeCheck aria-hidden="true" size={17} />
                <span>{certification}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  useCyberInteractions();
  useInitialHashScroll();
  const activeSection = useActiveSection();
  const useStaticHeroScene = useMediaQuery("(max-width: 860px)", true);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const selectedProject =
    selectedProjectIndex === null ? null : projects[selectedProjectIndex];
  const visibleProjectEntries = projects.map((project, projectIndex) => ({ project, projectIndex }));
  const featuredProjects = featuredProjectTitles.flatMap((title) => {
    const entry = visibleProjectEntries.find(({ project }) => project.title === title);
    return entry ? [entry] : [];
  });
  const featuredTitleSet = new Set(featuredProjectTitles);
  const morePrioritySet = new Set(moreProjectPriorityTitles);
  const moreProjects = [
    ...moreProjectPriorityTitles.flatMap((title) => {
      const entry = visibleProjectEntries.find(({ project }) => project.title === title);
      return !entry || featuredTitleSet.has(title) ? [] : [entry];
    }),
    ...visibleProjectEntries.flatMap(({ project, projectIndex }) =>
      featuredTitleSet.has(project.title) || morePrioritySet.has(project.title) ? [] : [{ project, projectIndex }],
    ),
  ];
  const shellStyle = {
    "--hero-image": `url(${cyberpunkHero})`,
  } as CSSProperties & Record<string, string>;
  const currentYear = new Date().getFullYear();

  return (
    <div className="site-shell" style={shellStyle}>
      <div className="photo-backdrop" aria-hidden="true" />
      <div className="cursor-aura" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <Header activeSection={activeSection} />

      <main>
        <section className="hero-section page-stage reveal is-visible" id="home" aria-labelledby="hero-title">
          <div className="hero-coordinate-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-copy">
            <div className="hero-status-row hero-entrance" aria-label="Availability and location">
              <span className="hero-status">
                <span aria-hidden="true" />
                Available for AI/ML + XR roles
              </span>
              <span className="hero-coordinate">53.5461°N / R&amp;D LAB</span>
            </div>
            <div className="hero-label-row hero-entrance">
              <p className="hero-eyebrow">AI/ML x XR x Full-Stack</p>
            </div>
            <h1 className="hero-title hero-entrance" id="hero-title" data-text={heroHeadline}>
              <span>Geoffrey</span>
              {" "}
              <span><em>Lazer</em></span>
            </h1>
            <p className="hero-summary hero-entrance">{heroSubheadline}</p>
            <div className="hero-project-signals hero-entrance" aria-label="Project signals">
              {heroProjectSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
            <div className="hero-actions hero-entrance" aria-label="Portfolio actions">
              <a
                className="button primary"
                href="#projects"
                onClick={(event) => handleHashScrollClick(event, "#projects")}
                data-tilt
                data-magnetic
              >
                <Sparkles aria-hidden="true" size={18} />
                View Projects
              </a>
              <a
                className="button secondary"
                href="#contact"
                onClick={(event) => handleHashScrollClick(event, "#contact")}
                data-tilt
                data-magnetic
              >
                <Send aria-hidden="true" size={18} />
                Contact Me
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-hologram">
              <div className="hero-holo-grid" />
              <div className="hero-glow" />
              <div className="hero-connector" />
              {useStaticHeroScene ? (
                <HeroSceneStaticFallback />
              ) : (
                <Suspense fallback={<div className="hero-scene-placeholder" aria-hidden="true" />}>
                  <HeroScene />
                </Suspense>
              )}
              <div className="hero-scanline" />
              {heroSystemLabels.map((label, index) => (
                <div className={`hero-system-label hero-system-label-${index + 1}`} key={`${label.code}-${label.label}`}>
                  <span>{label.code}</span>
                  <strong>{label.label}</strong>
                </div>
              ))}
              {heroSignals.map((signal, index) => (
                <div className={`hero-signal-card hero-signal-card-${index + 1}`} key={signal.label}>
                  <strong>{signal.value}</strong>
                  <span>{signal.label}</span>
                </div>
              ))}
            </div>
          </div>

          <ul className="hero-tags" aria-label="Core focus areas">
            {heroTags.map((tag, index) => (
              <li
                className="hero-tag"
                key={tag}
                style={{ "--tag-delay": `${520 + index * 80}ms` } as CSSProperties}
              >
                {tag}
              </li>
            ))}
          </ul>

          <a
            className="scroll-cue"
            href="#experience"
            aria-label="Scroll to experience"
            onClick={(event) => handleHashScrollClick(event, "#experience")}
          >
            <span aria-hidden="true" />
            <strong>EXPLORE</strong>
          </a>
        </section>

        <section className="manifesto-band reveal" aria-labelledby="manifesto-title">
          <p className="eyebrow">Quick Read</p>
          <h2 id="manifesto-title">
            Start with recent roles, then open the projects that show the same AI/ML, XR, and full-stack skills in motion.
          </h2>
          <a className="manifesto-link" href="#experience" onClick={(event) => handleHashScrollClick(event, "#experience")} data-tilt>
            Start with experience
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </section>

        <section className="page-section resume-page experience-page reveal" id="experience" aria-labelledby="experience-title">
          <div className="section-heading wide experience-heading">
            <p className="eyebrow">Selected Experience</p>
            <h2 id="experience-title">Experience across AI/ML, XR + production software.</h2>
            <p className="section-intro">
              A focused timeline spanning applied ML, XR software, SWE mentorship, and data-driven web systems.
            </p>
          </div>

          <div className="experience-grid selected-experience-grid">
            {selectedExperience.map((role, index) => (
              <SelectedExperienceCard role={role} index={index} key={`${role.company}-${role.title}`} />
            ))}
          </div>
        </section>

        <section className="page-section projects-page reveal" id="projects" aria-labelledby="projects-title">
          <div className="section-heading wide">
            <p className="eyebrow">Featured Projects</p>
            <h2 id="projects-title">Selected systems + prototypes.</h2>
            <p className="section-intro">
              Work across AI/ML, XR, 3D visualization, data pipelines, and full-stack research tooling.
            </p>
          </div>
          <div className="focus-marquee" aria-hidden="true">
            <div>
              {focusTags.concat(focusTags).map((tag, index) => (
                <span key={`${tag}-${index}`}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="project-grid featured-project-grid">
            {featuredProjects.map(({ project, projectIndex }, index) => (
              <ProjectCard
                project={project}
                index={index}
                key={project.title}
                onOpen={() => setSelectedProjectIndex(projectIndex)}
              />
            ))}
          </div>

          <div className="more-projects-panel reveal" aria-labelledby="more-projects-title">
            <div className="more-projects-heading">
              <div>
                <p className="eyebrow">More Projects</p>
                <h3 id="more-projects-title">Additional prototypes + experiments.</h3>
              </div>
              <span>{moreProjects.length} more</span>
            </div>
            <div className="more-project-grid">
              {moreProjects.map(({ project, projectIndex }, index) => (
                <ProjectCard
                  project={project}
                  index={featuredProjects.length + index}
                  key={project.title}
                  compact
                  onOpen={() => setSelectedProjectIndex(projectIndex)}
                />
              ))}
            </div>
          </div>
        </section>

        <EducationSection />

        <TechnicalStackSection />

        <section className="page-section about-page reveal" id="about" aria-labelledby="about-title">
          <div className="page-kicker">Welcome To My World</div>
          <div className="about-layout">
            <div className="portrait-frame" data-tilt>
              <img src={profile.portrait} alt={profile.name} loading="lazy" />
            </div>
            <div className="about-copy">
              <p className="eyebrow">About Geoffrey</p>
              <h2 id="about-title">Research prototypes x real software.</h2>
              <p className="about-lede">
                I work across AI/ML, XR, 3D visualization, and full-stack software, building systems
                that turn complex data, sensor signals, and research ideas into interactive tools
                people can understand and use.
              </p>
              <div className="about-support">
                <p>
                  My work tends to start with messy technical material: volumetric imaging data,
                  model outputs, geospatial layers, experimental sensors, or a prototype that needs
                  a more usable interface.
                </p>
                <p>
                  I like the space where algorithms, 3D interaction, and product thinking meet:
                  enough engineering discipline to ship, enough research curiosity to keep the
                  interface honest.
                </p>
              </div>
              <div className="highlight-grid about-stat-grid">
                {[
                  ["MSc", "MSc Computing Science", "University of Alberta, multimedia systems"],
                  ["AI/ML", "AI/ML + XR Focus", "Models, interaction, and spatial interfaces"],
                  ["3D", "XR + 3D Systems", "Unity, rendering, visualization"],
                  ["R&D", "Research-to-Product Builder", "Prototype logic shaped into usable tools"],
                ].map(([code, title, text]) => (
                  <article className="highlight-card about-stat-card reveal" key={title} data-tilt>
                    <strong>{code}</strong>
                    <div>
                      <h3>{title}</h3>
                      <span>{text}</span>
                    </div>
                  </article>
                ))}
              </div>
              <p className="about-creative-line">
                I&apos;m drawn to projects where the interface makes the intelligence visible.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section contact-page reveal" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="eyebrow">{profile.location}</p>
            <h2 id="contact-title">Have a complex idea that needs to become real?</h2>
            <p className="contact-subheadline">
              I&apos;m open to AI/ML, XR, full-stack software, 3D systems, and R&amp;D product opportunities.
            </p>
            <p className="contact-note">
              Useful conversations usually start with a hard dataset, an ambitious prototype,
              or a system that needs a clearer interface.
            </p>
          </div>
          <div className="contact-cta-panel" aria-label="Contact actions" data-tilt>
            <div className="contact-panel-header">
              <span aria-hidden="true" />
              <div>
                <p>Signal open</p>
                <strong>Recruiters · collaborators · technical teams</strong>
              </div>
            </div>
            <div className="contact-actions">
              <a
                className="contact-action primary"
                href={`mailto:${profile.email}?subject=Portfolio%20opportunity%20for%20Geoffrey%20Lazer`}
                aria-label={`Email Geoffrey Lazer at ${profile.email}`}
                data-tilt
                data-magnetic
              >
                <Mail aria-hidden="true" size={18} />
                Email Me
              </a>
              <a className="contact-action" href="/resume.pdf" download aria-label="Download Geoffrey Lazer resume PDF">
                <FileDown aria-hidden="true" size={18} />
                Download Resume
              </a>
              <a
                className="contact-action"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Geoffrey Lazer LinkedIn profile"
              >
                <Linkedin aria-hidden="true" size={18} />
                LinkedIn
              </a>
              <a
                className="contact-action"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Geoffrey Lazer GitHub profile"
              >
                <Github aria-hidden="true" size={18} />
                GitHub
              </a>
            </div>
            <div className="contact-panel-footer">
              <span>Response channel</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mega-footer reveal is-visible" id="footer" aria-label="Site footer">
        <div className="footer-signature">
          <span aria-hidden="true">{profile.initials}</span>
          <p>Built with code, caffeine, and a suspicious amount of geometry.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {footerNavItems.map((item) => (
            <a href={item.href} key={item.id} onClick={(event) => handleHashScrollClick(event, item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="footer-copy">© {currentYear} {profile.name}</p>
      </footer>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          index={selectedProjectIndex ?? 0}
          onClose={() => setSelectedProjectIndex(null)}
        />
      )}
    </div>
  );
}

export default App;
