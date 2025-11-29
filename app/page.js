'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Скоро Сказка',
    subtitle: 'Генератор детских книг',
    description:
      'Персонализированные иллюстрированные сказки за 5 минут. Имя ребёнка, любимая игрушка, еда — всё становится частью истории.',
    tags: ['AI', 'Генерация', 'Дети'],
    color: '#C75B3A',
    stats: '100+ пользователей',
    result: 'Создает персональную сказку за 5 минут',
    images: ['/images/skoro-skazka.svg'],
    link: 'https://skoroskazka.ru',
  },
  {
    id: 2,
    title: 'FitTracker',
    subtitle: 'Умный дневник здоровья',
    description:
      'Сбрось текст, фото или голосовое — ИИ сам разберёт калории. Тренировки с таймером, учёт сна с метрикой долга, динамика веса.',
    tags: ['AI', 'Здоровье', 'Трекер'],
    color: '#8B9A7D',
    stats: 'Личный проект',
    images: ['/images/fittracker.svg'],
  },
  {
    id: 3,
    title: 'YogaManager',
    subtitle: 'Для йога-преподавателей',
    description:
      'Расписание, ученики, абонементы. Финансовая метрика: доход с групп, расходы на аренду и рекламу. Всё в одном месте.',
    tags: ['CRM', 'Йога', 'Финансы'],
    color: '#D4A574',
    stats: 'Запущен',
    result: 'Экономит часы на учете клиентов',
    images: ['/images/yogamanager.svg'],
  },
  {
    id: 4,
    title: 'Realty CRM',
    subtitle: 'Для агентства недвижимости',
    description:
      'Клиенты и объекты переплетаются. Динамика цен, карта, «заинтересованности». KPI агентства в реальном времени.',
    tags: ['CRM', 'Недвижимость', 'Аналитика'],
    color: '#7D8B9A',
    stats: 'Запущен',
    result: 'Сэкономил 200к₽/год на подписках',
    images: ['/images/realty-crm.svg'],
  },
  {
    id: 5,
    title: 'Villa Landing',
    subtitle: 'Лэндинг виллы',
    description:
      'Стильный одностраничник для продажи элитной недвижимости. Акцент на фото, атмосферу и быструю связь.',
    tags: ['Landing', 'Недвижимость', 'Продажи'],
    color: '#2C3E50',
    stats: 'Запущен',
    images: [],
  },
];

const processSteps = [
  {
    id: 1,
    icon: '◆',
    title: 'Обсуждаем',
    description: 'Простым языком, без ТЗ и корпоративных формальностей. Просто рассказываешь, что нужно.',
  },
  {
    id: 2,
    icon: '◈',
    title: 'MVP за 3-5 дней',
    description: 'Быстрый прототип, чтобы ты увидел идею в действии и понял, туда ли мы движемся.',
  },
  {
    id: 3,
    icon: '○',
    title: 'Доводим до идеала',
    description: 'Корректируем вместе, пока не получится именно то, что ты задумал. Без ограничений.',
  },
];

const stats = [
  { value: '5', label: 'проектов запущено', suffix: '' },
  { value: '3-5', label: 'дней на MVP', suffix: '' },
  { value: '100', label: 'AI-Native код', suffix: '%' },
  { value: '100', label: 'удовлетворенность', suffix: '%' },
];

export default function LandingPage() {
  const [activeProject, setActiveProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setIsLoaded(true));
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer для scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.blob1,
          transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.01}px)`,
        }}
      />
      <div
        style={{
          ...styles.blob2,
          transform: `translate(${-scrollY * 0.015}px, ${scrollY * 0.02}px)`,
        }}
      />
      <div style={styles.gridLines} />

      <header style={styles.hero}>
        <nav
          className="nav-container"
          style={{
            ...styles.nav,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          }}
        >
          <div style={styles.logo}>ИК</div>
          <div style={styles.navLinks} className="nav-links">
            <a href="#manifest" style={styles.navLink} className="nav-link">
              Манифест
            </a>
            <a href="#projects" style={styles.navLink} className="nav-link">
              Проекты
            </a>
            <a href="#contact" style={styles.navLink} className="nav-link">
              Контакт
            </a>
          </div>
        </nav>

        <div style={styles.heroContent} className="hero-content">
          <div
            style={{
              ...styles.heroText,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '0.2s',
            }}
            className="hero-text"
          >
            <div style={styles.heroLabel}>Вайб-код разработчик</div>
            <h1 style={styles.heroTitle} className="hero-title">Илья Кожа</h1>
            <p style={styles.heroSubtitle} className="hero-subtitle">
              Создаю приложения под тебя — без корпоративного мусора, лишних фич и чужих правил. Только то, что нужно
              именно тебе.
            </p>
            <div style={styles.heroActions} className="hero-actions">
              <a
                href="https://t.me/dreamrandomlab"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.primaryButton}
              >
                <TelegramIcon />
                Telegram
              </a>
              <a href="mailto:ilia.kozha@gmail.com" style={styles.secondaryButton}>
                Написать
              </a>
            </div>
          </div>

          <div
            style={{
              ...styles.heroImageWrapper,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.9)',
              transitionDelay: '0.4s',
            }}
            className="hero-image-wrapper"
          >
            <div style={styles.heroImageFrame} className="hero-image-frame">
              <Image
                src="/images/ilia-kozha.svg"
                alt="Илья Кожа"
                width={320}
                height={400}
                priority
                sizes="320px"
                style={styles.heroImage}
              />
            </div>
            <div style={styles.decorCircle} />
            <div style={styles.decorDots} />
          </div>
        </div>

        <div
          style={{
            ...styles.scrollIndicator,
            opacity: isLoaded ? 1 : 0,
            transitionDelay: '0.8s',
          }}
        >
          <div style={styles.scrollLine} />
          <span style={styles.scrollText}>скролль</span>
        </div>
      </header>

      <section id="manifest" style={styles.manifestSection} className="manifest-section fade-in-section">
        <div style={styles.manifestContent}>
          <div style={styles.manifestLabel}>Философия</div>
          <h2 style={styles.manifestTitle} className="manifest-title">«А так можно было?»</h2>
          <div style={styles.manifestGrid} className="manifest-grid">
            <div
              style={styles.manifestCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={styles.manifestIcon}>✦</div>
              <h3 style={styles.manifestCardTitle}>Вайб-кодинг</h3>
              <p style={styles.manifestCardText}>
                Программирование через диалог с ИИ. Описываешь что хочешь — получаешь работающий код. Без годов обучения,
                без лишней сложности.
              </p>
            </div>
            <div
              style={styles.manifestCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={styles.manifestIcon}>◈</div>
              <h3 style={styles.manifestCardTitle}>Индивидуальность</h3>
              <p style={styles.manifestCardText}>
                Рыночные решения делают «для всех» — значит, ни для кого конкретно. Твоё приложение должно работать
                именно под твои задачи.
              </p>
            </div>
            <div
              style={styles.manifestCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={styles.manifestIcon}>○</div>
              <h3 style={styles.manifestCardTitle}>Без мусора</h3>
              <p style={styles.manifestCardText}>
                Никакой рекламы, сбора данных, ненужных фич и корпоративной нагрузки. Чистый инструмент, который просто
                работает.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.processSection} className="process-section fade-in-section">
        <div style={styles.processContent}>
          <div style={styles.sectionLabel}>Процесс</div>
          <h2 style={styles.sectionTitle}>Как я работаю</h2>
          <div style={styles.processGrid}>
            {processSteps.map((step) => (
              <div
                key={step.id}
                style={styles.processCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.02)';
                }}
              >
                <div style={styles.processNumber}>{step.id}</div>
                <div style={styles.processIcon}>{step.icon}</div>
                <h3 style={styles.processTitle}>{step.title}</h3>
                <p style={styles.processText}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" style={styles.projectsSection} className="projects-section fade-in-section">
        <div style={styles.sectionHeader}>
          <div style={styles.sectionLabel}>Портфолио</div>
          <h2 style={styles.sectionTitle}>Проекты</h2>
        </div>

        <div style={styles.projectsGrid} className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{
                ...styles.projectCard,
                animationDelay: `${index * 0.1}s`,
              }}
              onClick={() => setActiveProject(project)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(45, 42, 38, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 30px rgba(45, 42, 38, 0.08)';
              }}
            >
              <div style={{ ...styles.projectAccent, backgroundColor: project.color }} />
              <div style={styles.projectHeader}>
                <span style={styles.projectStats}>{project.stats}</span>
                {project.images.length > 0 && (
                  <div style={styles.projectGalleryHint}>
                    <GalleryIcon />
                    {project.images.length}
                  </div>
                )}
              </div>
              <h3 style={styles.projectTitle}>{project.title}</h3>
              <p style={styles.projectSubtitle}>{project.subtitle}</p>
              <p style={styles.projectDescription}>{project.description}</p>
              {project.result && (
                <div style={styles.projectResult}>
                  <span style={styles.projectResultIcon}>✓</span>
                  {project.result}
                </div>
              )}
              <div style={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag} style={styles.projectTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.statsSection} className="stats-section fade-in-section">
        <div style={styles.statsGrid} className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div style={styles.statValue} className="stat-value">
                {stat.value}
                <span style={styles.statSuffix}>{stat.suffix}</span>
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={styles.statsQuote}>
          «От твоей идеи — к точному воплощению. Никакого мусора между»
        </div>
      </section>

      <section id="contact" style={styles.contactSection} className="contact-section fade-in-section">
        <div style={styles.contactContent}>
          <h2 style={styles.contactTitle} className="contact-title">
            Есть идея?
            <br />
            Обсудим за 15 минут
          </h2>
          <p style={styles.contactText}>
            Если у тебя есть идея приложения, которое решит именно твою проблему — напиши. Обсудим, как это можно
            сделать быстро и без лишней сложности.
          </p>
          <div style={styles.contactLinks}>
            <a
              href="https://t.me/dreamrandomlab"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.contactLink}
            >
              <TelegramIcon />
              @dreamrandomlab
            </a>
            <a href="mailto:ilia.kozha@gmail.com" style={styles.contactLink}>
              <EmailIcon />
              ilia.kozha@gmail.com
            </a>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span>© 2025 Илья Кожа</span>
          <span style={styles.footerDivider}>·</span>
          <span>Вайб-код разработчик</span>
        </div>
      </footer>

      {activeProject && (
        <div style={styles.modalOverlay} onClick={() => setActiveProject(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()} className="modal-content">
            <button style={styles.modalClose} onClick={() => setActiveProject(null)}>
              ×
            </button>
            <div style={{ ...styles.modalAccent, backgroundColor: activeProject.color }} />
            <h2 style={styles.modalTitle}>{activeProject.title}</h2>
            <p style={styles.modalSubtitle}>{activeProject.subtitle}</p>
            <p style={styles.modalDescription}>{activeProject.description}</p>

            {activeProject.images.length > 0 && (
              <div style={styles.modalGallery}>
                <div style={styles.galleryLabel}>Скриншоты</div>
                <div style={styles.galleryGrid} className="gallery-grid">
                  {activeProject.images.map((img, i) => (
                    <div key={`${img}-${i}`} style={styles.galleryItem}>
                      <Image
                        src={img}
                        alt={`${activeProject.title} скриншот ${i + 1}`}
                        width={400}
                        height={260}
                        sizes="(max-width: 768px) 100vw, 400px"
                        style={styles.galleryImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeProject.link && (
              <a href={activeProject.link} target="_blank" rel="noopener noreferrer" style={styles.modalLink}>
                Открыть проект →
              </a>
            )}

            <div style={styles.modalTags}>
              {activeProject.tags.map((tag) => (
                <span key={tag} style={styles.modalTag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6 12 13 2 6" />
  </svg>
);

const GalleryIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15 16 10 5 21" />
  </svg>
);

const styles = {
  container: {
    minHeight: '100vh',
    position: 'relative',
    background: 'linear-gradient(180deg, #F5F2EB 0%, #EBE6DE 50%, #F5F2EB 100%)',
    overflow: 'hidden',
  },
  blob1: {
    position: 'fixed',
    top: '-10%',
    right: '-5%',
    width: '800px',
    height: '800px',
    background: 'radial-gradient(circle, rgba(199, 91, 58, 0.12) 0%, transparent 60%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    transition: 'transform 0.3s ease-out',
    zIndex: 0,
  },
  blob2: {
    position: 'fixed',
    bottom: '-10%',
    left: '-10%',
    width: '700px',
    height: '700px',
    background: 'radial-gradient(circle, rgba(139, 154, 125, 0.15) 0%, transparent 60%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    transition: 'transform 0.3s ease-out',
    zIndex: 0,
  },
  gridLines: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(rgba(45, 42, 38, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(45, 42, 38, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: '100px 100px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '32px 64px',
    position: 'relative',
    zIndex: 100,
    transition: 'all 0.6s ease',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '26px',
    fontWeight: '600',
    color: '#2D2A26',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid rgba(45, 42, 38, 0.1)',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
  },
  navLinks: {
    display: 'flex',
    gap: '48px',
    background: 'rgba(255, 255, 255, 0.3)',
    padding: '12px 32px',
    borderRadius: '100px',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
  },
  navLink: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: '500',
    color: '#2D2A26',
    textDecoration: 'none',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    position: 'relative',
    opacity: 0.7,
  },
  hero: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
  },
  heroContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 64px 80px',
    maxWidth: '1440px',
    margin: '0 auto',
    width: '100%',
    gap: '100px',
  },
  heroText: {
    flex: 1,
    maxWidth: '640px',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  heroLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    color: '#C75B3A',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '24px',
    display: 'inline-block',
    padding: '8px 16px',
    background: 'rgba(199, 91, 58, 0.08)',
    borderRadius: '100px',
    border: '1px solid rgba(199, 91, 58, 0.1)',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(56px, 8vw, 96px)',
    fontWeight: '500',
    color: '#2D2A26',
    lineHeight: '1.05',
    marginBottom: '32px',
    letterSpacing: '-0.02em',
  },
  heroSubtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '20px',
    fontWeight: '300',
    color: '#5C5954',
    lineHeight: '1.6',
    marginBottom: '48px',
    maxWidth: '540px',
  },
  heroActions: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px 36px',
    background: '#2D2A26',
    color: '#FAF8F5',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '15px',
    fontWeight: '500',
    textDecoration: 'none',
    borderRadius: '100px',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(45, 42, 38, 0.15)',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px 36px',
    background: 'rgba(255, 255, 255, 0.5)',
    color: '#2D2A26',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '15px',
    fontWeight: '500',
    textDecoration: 'none',
    borderRadius: '100px',
    border: '1px solid rgba(45, 42, 38, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
  },
  heroImageWrapper: {
    position: 'relative',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  heroImageFrame: {
    width: '360px',
    height: '460px',
    borderRadius: '240px 240px 24px 24px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 40px 100px rgba(45, 42, 38, 0.12), 0 10px 30px rgba(45, 42, 38, 0.05)',
    border: '8px solid rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(20px)',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    transition: 'transform 0.8s ease',
  },
  decorCircle: {
    position: 'absolute',
    top: '-30px',
    right: '-30px',
    width: '100px',
    height: '100px',
    border: '2px solid rgba(199, 91, 58, 0.2)',
    borderRadius: '50%',
    animation: 'float 5s ease-in-out infinite',
    zIndex: -1,
  },
  decorDots: {
    position: 'absolute',
    bottom: '60px',
    left: '-60px',
    width: '120px',
    height: '120px',
    backgroundImage: 'radial-gradient(circle, #C75B3A 2px, transparent 2px)',
    backgroundSize: '20px 20px',
    opacity: 0.2,
    zIndex: -1,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    transition: 'opacity 0.6s ease',
    zIndex: 10,
  },
  scrollLine: {
    width: '1px',
    height: '60px',
    background: 'linear-gradient(180deg, rgba(45, 42, 38, 0), #2D2A26)',
    animation: 'scrollDown 2s ease-in-out infinite',
  },
  scrollText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '11px',
    color: '#8B8680',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  manifestSection: {
    padding: '100px 64px',
    position: 'relative',
    zIndex: 2,
  },
  manifestContent: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  manifestLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: '600',
    color: '#C75B3A',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '20px',
    opacity: 0.8,
  },
  manifestTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(40px, 6vw, 64px)',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '80px',
    maxWidth: '800px',
  },
  manifestGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '40px',
  },
  manifestCard: {
    padding: '48px',
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(24px)',
    borderRadius: '32px',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.02)',
  },
  manifestIcon: {
    fontSize: '40px',
    color: '#C75B3A',
    marginBottom: '24px',
    display: 'inline-block',
    padding: '16px',
    background: 'rgba(199, 91, 58, 0.05)',
    borderRadius: '20px',
  },
  manifestCardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '28px',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '16px',
  },
  manifestCardText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.7',
    opacity: 0.9,
  },
  projectsSection: {
    padding: '80px 64px 100px',
    position: 'relative',
    zIndex: 2,
  },
  sectionHeader: {
    maxWidth: '1280px',
    margin: '0 auto 80px',
  },
  sectionLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: '600',
    color: '#C75B3A',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '16px',
    opacity: 0.8,
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(40px, 6vw, 64px)',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '60px',
    maxWidth: '800px',
  },
  processSection: {
    padding: '80px 64px',
    position: 'relative',
    zIndex: 2,
  },
  processContent: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
  },
  processCard: {
    position: 'relative',
    padding: '48px 40px',
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(24px)',
    borderRadius: '32px',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.02)',
  },
  processNumber: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    fontFamily: "'Playfair Display', serif",
    fontSize: '64px',
    fontWeight: '300',
    color: 'rgba(199, 91, 58, 0.1)',
    lineHeight: '1',
  },
  processIcon: {
    fontSize: '48px',
    marginBottom: '24px',
    display: 'block',
    color: '#C75B3A',
  },
  processTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '28px',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '16px',
  },
  processText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.7',
    opacity: 0.9,
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '40px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  projectCard: {
    position: 'relative',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(30px)',
    borderRadius: '32px',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 10px 30px rgba(45, 42, 38, 0.04)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  projectAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    opacity: 0.8,
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  projectStats: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '12px',
    fontWeight: '600',
    color: '#8B8680',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '6px 12px',
    background: 'rgba(45, 42, 38, 0.05)',
    borderRadius: '100px',
  },
  projectGalleryHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '12px',
    fontWeight: '500',
    color: '#8B8680',
    padding: '6px 12px',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '100px',
  },
  projectTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '32px',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '8px',
  },
  projectSubtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '15px',
    fontWeight: '500',
    color: '#C75B3A',
    marginBottom: '20px',
    display: 'block',
  },
  projectDescription: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.7',
    marginBottom: '20px',
  },
  projectResult: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'rgba(139, 154, 125, 0.08)',
    borderRadius: '12px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: '500',
    color: '#5C5954',
    marginBottom: '24px',
    border: '1px solid rgba(139, 154, 125, 0.15)',
  },
  projectResultIcon: {
    fontSize: '16px',
    color: '#8B9A7D',
  },
  projectTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  projectTag: {
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '100px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '12px',
    fontWeight: '500',
    color: '#5C5954',
    border: '1px solid rgba(45, 42, 38, 0.05)',
  },
  statsSection: {
    padding: '80px 64px',
    background: '#2D2A26',
    position: 'relative',
    color: '#FAF8F5',
    overflow: 'hidden',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '60px',
    maxWidth: '1200px',
    margin: '0 auto 60px',
    position: 'relative',
    zIndex: 2,
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(56px, 6vw, 80px)',
    fontWeight: '400',
    color: '#FAF8F5',
    lineHeight: '1',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '4px',
  },
  statSuffix: {
    fontSize: '0.5em',
    opacity: 0.6,
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '300',
  },
  statLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgba(250, 248, 245, 0.6)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  statsQuote: {
    textAlign: 'center',
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(24px, 4vw, 32px)',
    fontWeight: '400',
    color: 'rgba(250, 248, 245, 0.9)',
    maxWidth: '1200px',
    margin: '0 auto',
    lineHeight: '1.4',
    fontStyle: 'italic',
    position: 'relative',
    zIndex: 2,
  },
  contactSection: {
    padding: '100px 64px',
    position: 'relative',
    zIndex: 2,
  },
  contactContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  contactTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(48px, 6vw, 72px)',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '32px',
    lineHeight: '1.1',
  },
  contactText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '18px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.6',
    marginBottom: '60px',
    maxWidth: '600px',
    margin: '0 auto 60px',
  },
  contactLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  contactLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 40px',
    background: '#fff',
    color: '#2D2A26',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '500',
    textDecoration: 'none',
    borderRadius: '100px',
    boxShadow: '0 20px 40px rgba(45, 42, 38, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    border: '1px solid rgba(45, 42, 38, 0.05)',
  },
  footer: {
    padding: '40px 64px',
    borderTop: '1px solid rgba(45, 42, 38, 0.06)',
    background: '#FAF8F5',
  },
  footerContent: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    color: '#8B8680',
  },
  footerDivider: {
    opacity: 0.4,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(45, 42, 38, 0.6)',
    backdropFilter: 'blur(12px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    animation: 'fadeIn 0.3s ease-out',
  },
  modal: {
    background: '#FAF8F5',
    borderRadius: '32px',
    padding: '48px',
    maxWidth: '900px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 40px 100px rgba(0, 0, 0, 0.2)',
    animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  modalClose: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(45, 42, 38, 0.05)',
    color: '#2D2A26',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  modalAccent: {
    width: '60px',
    height: '6px',
    borderRadius: '100px',
    marginBottom: '32px',
  },
  modalTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '40px',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '8px',
  },
  modalSubtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '18px',
    fontWeight: '500',
    color: '#C75B3A',
    marginBottom: '24px',
  },
  modalDescription: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '18px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.7',
    marginBottom: '40px',
    maxWidth: '700px',
  },
  modalGallery: {
    marginBottom: '40px',
  },
  galleryLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: '600',
    color: '#8B8680',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '20px',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  galleryItem: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    background: '#fff',
  },
  galleryImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  modalLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 32px',
    background: '#2D2A26',
    color: '#FAF8F5',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '15px',
    fontWeight: '500',
    textDecoration: 'none',
    borderRadius: '100px',
    marginBottom: '40px',
    transition: 'all 0.3s ease',
  },
  modalTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    borderTop: '1px solid rgba(45, 42, 38, 0.08)',
    paddingTop: '32px',
  },
  modalTag: {
    padding: '8px 16px',
    background: 'rgba(45, 42, 38, 0.04)',
    borderRadius: '100px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: '500',
    color: '#5C5954',
  },
};
