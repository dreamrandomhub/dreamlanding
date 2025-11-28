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
    stats: 'MVP готов',
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
    stats: 'В разработке',
    images: ['/images/realty-crm.svg'],
  },
];

const stats = [
  { value: '1', label: 'год пути', suffix: '' },
  { value: '120', label: 'тысяч строк кода', suffix: 'K+' },
  { value: '0', label: 'знаний → продакшен', suffix: '' },
  { value: '100', label: 'пользователей', suffix: '+' },
];

export default function LandingPage() {
  const [activeProject, setActiveProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setIsLoaded(true));
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
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
          style={{
            ...styles.nav,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          }}
        >
          <div style={styles.logo}>ИК</div>
          <div style={styles.navLinks}>
            <a href="#manifest" style={styles.navLink}>
              Манифест
            </a>
            <a href="#projects" style={styles.navLink}>
              Проекты
            </a>
            <a href="#contact" style={styles.navLink}>
              Контакт
            </a>
          </div>
        </nav>

        <div style={styles.heroContent}>
          <div
            style={{
              ...styles.heroText,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '0.2s',
            }}
          >
            <div style={styles.heroLabel}>Вайб-код разработчик</div>
            <h1 style={styles.heroTitle}>Илья Кожа</h1>
            <p style={styles.heroSubtitle}>
              Создаю приложения под себя — без корпоративного мусора, лишних фич и чужих правил. Только то, что нужно
              именно тебе.
            </p>
            <div style={styles.heroActions}>
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
          >
            <div style={styles.heroImageFrame}>
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

      <section id="manifest" style={styles.manifestSection}>
        <div style={styles.manifestContent}>
          <div style={styles.manifestLabel}>Философия</div>
          <h2 style={styles.manifestTitle}>«А так можно было?»</h2>
          <div style={styles.manifestGrid}>
            <div style={styles.manifestCard}>
              <div style={styles.manifestIcon}>✦</div>
              <h3 style={styles.manifestCardTitle}>Вайб-кодинг</h3>
              <p style={styles.manifestCardText}>
                Программирование через диалог с ИИ. Описываешь что хочешь — получаешь работающий код. Без годов обучения,
                без лишней сложности.
              </p>
            </div>
            <div style={styles.manifestCard}>
              <div style={styles.manifestIcon}>◈</div>
              <h3 style={styles.manifestCardTitle}>Индивидуальность</h3>
              <p style={styles.manifestCardText}>
                Рыночные решения делают «для всех» — значит, ни для кого конкретно. Твоё приложение должно работать
                именно под твои задачи.
              </p>
            </div>
            <div style={styles.manifestCard}>
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

      <section id="projects" style={styles.projectsSection}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionLabel}>Портфолио</div>
          <h2 style={styles.sectionTitle}>Проекты</h2>
        </div>

        <div style={styles.projectsGrid}>
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

      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div style={styles.statValue}>
                {stat.value}
                <span style={styles.statSuffix}>{stat.suffix}</span>
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={styles.statsQuote}>
          «От нуля знаний о программировании до продакшена с реальными пользователями — за год»
        </div>
      </section>

      <section id="contact" style={styles.contactSection}>
        <div style={styles.contactContent}>
          <h2 style={styles.contactTitle}>
            Давай создадим
            <br />
            что-то под тебя
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
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
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
                <div style={styles.galleryGrid}>
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
    background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F0E8 50%, #FAF8F5 100%)',
  },
  blob1: {
    position: 'fixed',
    top: '10%',
    right: '-10%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(199, 91, 58, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
    transition: 'transform 0.3s ease-out',
  },
  blob2: {
    position: 'fixed',
    bottom: '20%',
    left: '-15%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(139, 154, 125, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
    transition: 'transform 0.3s ease-out',
  },
  gridLines: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(rgba(45, 42, 38, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(45, 42, 38, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 48px',
    position: 'relative',
    zIndex: 10,
    transition: 'all 0.6s ease',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '24px',
    fontWeight: '600',
    color: '#2D2A26',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #2D2A26',
    borderRadius: '50%',
  },
  navLinks: {
    display: 'flex',
    gap: '40px',
  },
  navLink: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: '500',
    color: '#2D2A26',
    textDecoration: 'none',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
    position: 'relative',
  },
  hero: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  heroContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 48px 80px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    gap: '80px',
  },
  heroText: {
    flex: 1,
    maxWidth: '600px',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  heroLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: '500',
    color: '#C75B3A',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(48px, 8vw, 80px)',
    fontWeight: '500',
    color: '#2D2A26',
    lineHeight: '1.1',
    marginBottom: '24px',
  },
  heroSubtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '18px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.7',
    marginBottom: '40px',
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  primaryButton: {
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
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 32px',
    background: 'transparent',
    color: '#2D2A26',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '15px',
    fontWeight: '500',
    textDecoration: 'none',
    borderRadius: '100px',
    border: '1.5px solid #2D2A26',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  heroImageWrapper: {
    position: 'relative',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  heroImageFrame: {
    width: '320px',
    height: '400px',
    borderRadius: '200px 200px 20px 20px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #F0EBE3 0%, #E8E2D9 100%)',
    boxShadow: '0 30px 80px rgba(45, 42, 38, 0.15)',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
  },
  decorCircle: {
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    width: '80px',
    height: '80px',
    border: '2px dashed rgba(199, 91, 58, 0.4)',
    borderRadius: '50%',
    animation: 'float 4s ease-in-out infinite',
  },
  decorDots: {
    position: 'absolute',
    bottom: '40px',
    left: '-40px',
    width: '100px',
    height: '100px',
    backgroundImage: 'radial-gradient(circle, #C75B3A 2px, transparent 2px)',
    backgroundSize: '16px 16px',
    opacity: 0.3,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    transition: 'opacity 0.6s ease',
  },
  scrollLine: {
    width: '1px',
    height: '40px',
    background: 'linear-gradient(180deg, transparent, #2D2A26)',
    animation: 'scrollDown 2s ease-in-out infinite',
  },
  scrollText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '11px',
    color: '#8B8680',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  manifestSection: {
    padding: '120px 48px',
    position: 'relative',
  },
  manifestContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  manifestLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: '500',
    color: '#C75B3A',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  manifestTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(36px, 5vw, 56px)',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '60px',
  },
  manifestGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
  },
  manifestCard: {
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(45, 42, 38, 0.08)',
    transition: 'all 0.3s ease',
  },
  manifestIcon: {
    fontSize: '32px',
    color: '#C75B3A',
    marginBottom: '20px',
  },
  manifestCardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '24px',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '12px',
  },
  manifestCardText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.7',
  },
  projectsSection: {
    padding: '80px 48px 120px',
    position: 'relative',
  },
  sectionHeader: {
    maxWidth: '1200px',
    margin: '0 auto 60px',
  },
  sectionLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: '500',
    color: '#C75B3A',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(36px, 5vw, 56px)',
    fontWeight: '500',
    color: '#2D2A26',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  projectCard: {
    position: 'relative',
    padding: '32px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(45, 42, 38, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 4px 30px rgba(45, 42, 38, 0.08)',
    overflow: 'hidden',
  },
  projectAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  projectStats: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '12px',
    fontWeight: '500',
    color: '#8B8680',
    letterSpacing: '0.5px',
  },
  projectGalleryHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '12px',
    color: '#8B8680',
  },
  projectTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '28px',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '4px',
  },
  projectSubtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: '500',
    color: '#C75B3A',
    marginBottom: '16px',
  },
  projectDescription: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '15px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  projectTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  projectTag: {
    padding: '6px 14px',
    background: 'rgba(45, 42, 38, 0.06)',
    borderRadius: '100px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '12px',
    fontWeight: '500',
    color: '#5C5954',
  },
  statsSection: {
    padding: '80px 48px',
    background: '#2D2A26',
    position: 'relative',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px',
    maxWidth: '1000px',
    margin: '0 auto 48px',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(48px, 8vw, 72px)',
    fontWeight: '500',
    color: '#FAF8F5',
    lineHeight: '1',
    marginBottom: '8px',
  },
  statSuffix: {
    fontSize: '0.5em',
    color: '#C75B3A',
  },
  statLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgba(250, 248, 245, 0.6)',
  },
  statsQuote: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '20px',
    fontWeight: '400',
    fontStyle: 'italic',
    color: 'rgba(250, 248, 245, 0.8)',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  contactSection: {
    padding: '120px 48px',
    position: 'relative',
  },
  contactContent: {
    maxWidth: '700px',
    margin: '0 auto',
    textAlign: 'center',
  },
  contactTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(36px, 5vw, 56px)',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '24px',
    lineHeight: '1.2',
  },
  contactText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '18px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.7',
    marginBottom: '48px',
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
    padding: '20px 36px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '100px',
    border: '1px solid rgba(45, 42, 38, 0.1)',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '500',
    color: '#2D2A26',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  footer: {
    padding: '32px 48px',
    borderTop: '1px solid rgba(45, 42, 38, 0.1)',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    color: '#8B8680',
  },
  footerDivider: {
    color: '#C75B3A',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(45, 42, 38, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease',
  },
  modal: {
    position: 'relative',
    width: '100%',
    maxWidth: '700px',
    maxHeight: '90vh',
    overflow: 'auto',
    background: '#FAF8F5',
    borderRadius: '32px',
    padding: '48px',
  },
  modalClose: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    width: '40px',
    height: '40px',
    border: 'none',
    background: 'rgba(45, 42, 38, 0.08)',
    borderRadius: '50%',
    fontSize: '24px',
    color: '#2D2A26',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  modalAccent: {
    width: '60px',
    height: '4px',
    borderRadius: '2px',
    marginBottom: '24px',
  },
  modalTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '36px',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '8px',
  },
  modalSubtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '500',
    color: '#C75B3A',
    marginBottom: '20px',
  },
  modalDescription: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '400',
    color: '#5C5954',
    lineHeight: '1.7',
    marginBottom: '32px',
  },
  modalGallery: {
    marginBottom: '32px',
  },
  galleryLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '12px',
    fontWeight: '500',
    color: '#8B8680',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
  },
  galleryItem: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(45, 42, 38, 0.1)',
  },
  galleryImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.3s ease',
  },
  modalLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    background: '#C75B3A',
    color: '#FAF8F5',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '15px',
    fontWeight: '500',
    textDecoration: 'none',
    borderRadius: '100px',
    marginBottom: '24px',
    transition: 'all 0.3s ease',
  },
  modalTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  modalTag: {
    padding: '8px 18px',
    background: 'rgba(45, 42, 38, 0.06)',
    borderRadius: '100px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: '500',
    color: '#5C5954',
  },
};
