'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion';

// --- Data ---

const projects = [
  {
    id: 1,
    title: 'Скоро Сказка',
    subtitle: 'Генератор детских книг',
    description:
      'Мой масштабный проект (100+ пользователей). В библиотеке более 100 книг, десятки сюжетов и 8 стилей иллюстраций. Персонализированные сказки за 5 минут: имя ребёнка, любимая игрушка, еда — всё становится органичной частью истории.',
    tags: ['AI', 'B2C', 'Генерация'],
    color: '#C75B3A',
    stats: '100+ пользователей',
    result: '100+ сказок создано',
    images: ['/images/skoroskazka1.png', '/images/skoroskazka2 .png', '/images/skoroskazka3.png'],
    link: 'https://skoroskazka.ru',
  },
  {
    id: 2,
    title: 'Fitness Diary',
    subtitle: 'Умный дневник здоровья',
    description:
      'Не просто "ввод еды": умный подсчет КБЖУ по фото/аудио/тексту, подгрузка микронутриентов. Экспорт дневника для внешней аналитики, мотивационные алгоритмы. Тренировочный модуль с таймерами и упражнениями. (Демо-доступ 3 дня, для активации напишите мне).',
    tags: ['HealthTech', 'AI', 'Mobile Web'],
    color: '#8B9A7D',
    stats: 'Демо доступны',
    result: 'Точный расчет КБЖУ',
    images: ['/images/fitness1.png', '/images/fitness2.png', '/images/fitness3.png', '/images/fitness4.png', '/images/fitness5.png'],
    link: 'https://ftrack-nine.vercel.app/',
  },
  {
    id: 3,
    title: 'RealtyCRM',
    subtitle: 'Для агентства недвижимости',
    description:
      'MVP для управления связями клиент<->объект. Возможность создавать встречи, вести глубокую аналитику, выгружать PDF с презентабельной карточкой объекта по нужному шаблону.',
    tags: ['CRM', 'B2B', 'Недвижимость'],
    color: '#7D8B9A',
    stats: 'MVP',
    result: 'Автоматизация рутины',
    images: ['/images/crm.png', '/images/crm 2.png', '/images/crm 3.png'],
    link: 'https://cityon.vercel.app/',
  },
  {
    id: 4,
    title: 'Villa Landing',
    subtitle: 'Лэндинг виллы',
    description:
      'Стильный одностраничник для продажи элитной недвижимости на Самуи. Акцент на фото, атмосферу и быструю связь.',
    tags: ['Landing', 'Design', 'Недвижимость'],
    color: '#2C3E50',
    stats: 'Запущен',
    result: 'High-end презентация',
    images: ['/images/villa1.png', '/images/villa2.png'],
    link: 'https://villadream-samui.vercel.app/ru',
  },
  {
    id: 5,
    title: 'Yoga App',
    subtitle: 'Платформа для преподавателя',
    description:
      'Расписание, база учеников, абонементы. В финальной версии реализована самозапись учеников на урок и встроенный мини-магазин брендовой одежды и девайсов автора.',
    tags: ['CRM', 'E-commerce', 'Booking'],
    color: '#D4A574',
    stats: 'Private',
    result: 'Полная автоматизация',
    images: ['/images/yoga 1.png', '/images/yoga2.png', '/images/yoga3.png'],
  },
];

const processSteps = [
  {
    id: 1,
    icon: '◆',
    title: 'Обсуждаем',
    description:
      'Простым языком, помогаю с ТЗ. Без корпоративных формальностей. Просто рассказываешь, что нужно. Прикидываем цены и сроки.',
  },
  {
    id: 2,
    icon: '◈',
    title: 'MVP за 1-3 дня',
    description:
      'Быстрый прототип, чтобы ты увидел идею в действии и понял, туда ли мы движемся. Заключаем сделку.',
  },
  {
    id: 3,
    icon: '○',
    title: 'Доводим до идеала',
    description:
      'Корректируем вместе, реализуем то, что ты задумал. Расширяем и улучшаем по любому направлению.',
  },
];

const stats = [
  { value: '5', label: 'проектов запущено', suffix: '' },
  { value: '3-5', label: 'дней на MVP', suffix: '' },
  { value: '100', label: 'AI-Native код', suffix: '%' },
  { value: '100', label: 'удовлетворенность', suffix: '%' },
];

// --- Components ---

function Magnetic({ children }) {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.1);
    position.y.set(middleY * 0.1);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ x, y }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={spring}
      style={{
        ...styles.projectCard,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        layoutId={`card-bg-${project.id}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 4px 30px rgba(45, 42, 38, 0.08)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <motion.div
          layoutId={`card-accent-${project.id}`}
          style={{ ...styles.projectAccent, backgroundColor: project.color }}
        />
        <div style={styles.projectHeader}>
          <motion.span layoutId={`card-stats-${project.id}`} style={styles.projectStats}>
            {project.stats}
          </motion.span>
          {project.images.length > 0 && (
            <div style={styles.projectGalleryHint}>
              <GalleryIcon />
              {project.images.length}
            </div>
          )}
        </div>
        <motion.h3 layoutId={`card-title-${project.id}`} style={styles.projectTitle}>
          {project.title}
        </motion.h3>
        <motion.p layoutId={`card-subtitle-${project.id}`} style={styles.projectSubtitle}>
          {project.subtitle}
        </motion.p>
        <motion.p
          layoutId={`card-desc-${project.id}`}
          style={styles.projectDescription}
        >
          {project.description}
        </motion.p>

        <div style={{ marginTop: 'auto' }}>
          {project.result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.projectResult}
            >
              <span style={styles.projectResultIcon}>✓</span>
              {project.result}
            </motion.div>
          )}
          <div style={styles.projectTags}>
            {project.tags.map((tag) => (
              <span key={tag} style={styles.projectTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

const ProcessCard = ({ step, index, hoveredIndex, setHoveredIndex }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={styles.processCard}
      className="process-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      animate={{
        scale: hoveredIndex === index ? 1.02 : 1,
        opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.3 : 1,
        borderColor: hoveredIndex === index ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
      }}
    >
      <motion.div
        style={{
          ...styles.spotlight,
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)`,
        }}
      />

      <div style={styles.processCardContent}>
        <div style={styles.processStepNumber} className="process-step-number">0{step.id}</div>
        <div style={styles.processIconWrapper} className="process-icon-wrapper">
          {step.icon}
        </div>

        <h3 style={styles.processTitle} className="process-title">{step.title}</h3>
        <p style={styles.processText} className="process-text">{step.description}</p>
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProcessIndex, setHoveredProcessIndex] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const { scrollY } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroImgScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Cursor Follower with Spring
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  // Блокируем скролл body когда модалка открыта
  useEffect(() => {
    if (activeProject || zoomedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject, zoomedImage]);

  return (
    <div style={styles.container}>
      <div className="noise-overlay" />
      <motion.div style={{ ...styles.cursorGlow, x: cursorX, y: cursorY }} />

      {/* Background Blobs */}
      <motion.div
        style={{ ...styles.blob1, y: y1 }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ ...styles.blob2, y: y2 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div style={styles.gridLines} />

      {/* Header */}
      <header style={styles.hero}>
        <nav className="nav-container" style={styles.nav}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={styles.logo}
          >
            ИК
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={styles.navLinks}
            className="nav-links"
          >
            {['manifest', 'projects', 'contact'].map((item) => (
              <Magnetic key={item}>
                <a href={`#${item}`} style={styles.navLink} className="nav-link">
                  {item === 'manifest' ? 'Манифест' : item === 'projects' ? 'Проекты' : 'Контакт'}
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </nav>

        <div style={styles.heroContent} className="hero-content">
          <motion.div
            style={{ ...styles.heroText, y: heroTextY }}
            className="hero-text"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={styles.heroLabel}
            >
              Вайб-код разработчик
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
              style={styles.heroTitle}
              className="hero-title"
            >
              Илья Кожа
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={styles.heroSubtitle}
              className="hero-subtitle"
            >
              Создаю приложения под тебя — без корпоративного мусора, лишних фич и чужих правил. Только то, что нужно именно тебе.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={styles.heroActions}
              className="hero-actions"
            >
              <Magnetic>
                <a
                  href="https://t.me/dreamrandomlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.primaryButton}
                >
                  <TelegramIcon />
                  Telegram
                </a>
              </Magnetic>
              <Magnetic>
                <a href="mailto:ilia.kozha@gmail.com" style={styles.secondaryButton}>
                  Написать
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            style={{ ...styles.heroImageWrapper, scale: heroImgScale }}
            className="hero-image-wrapper"
          >
            <div style={styles.heroImageFrame} className="hero-image-frame">
              <Image
                src="/images/self.JPG"
                alt="Илья Кожа"
                width={320}
                height={400}
                priority
                sizes="320px"
                style={styles.heroImage}
              />
            </div>
            <motion.div
              style={styles.decorCircle}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            <div style={styles.decorDots} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={styles.scrollIndicator}
        >
          <div style={styles.scrollLine} />
          <span style={styles.scrollText}>скролль</span>
        </motion.div>
      </header>

      {/* Manifest Section */}
      <section id="manifest" style={styles.manifestSection} className="manifest-section">
        <div style={styles.manifestContent}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div style={styles.manifestLabel}>Философия</div>
            <h2 style={styles.manifestTitle} className="manifest-title">«А так можно было?»</h2>
          </motion.div>

          <div style={styles.manifestGrid} className="manifest-grid">
            {[
              { icon: '✦', title: 'ИИ кодинг', text: 'Программирование через диалог с ИИ. Возможность выбирать архитектуру и подход к разработке. Гибкость и индивидуальность.' },
              { icon: '◈', title: 'Индивидуальность', text: 'Рыночные решения делают «для всех». ИИ дает персонализацию. Твоё приложение должно работать именно под твои задачи.' },
              { icon: '○', title: 'Без мусора', text: 'Никакой рекламы, сбора данных, ненужных фич. Чистый инструмент, который просто работает как ты этого хотел.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.06)' }}
                style={styles.manifestCard}
                className="manifest-card"
              >
                <motion.div
                  style={styles.manifestIcon}
                  className="manifest-icon"
                  animate={{
                    scale: [1, 1.15, 1],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 style={styles.manifestCardTitle} className="manifest-card-title">{item.title}</h3>
                <p style={styles.manifestCardText} className="manifest-card-text">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={styles.processSection} className="process-section">
        <div style={styles.processContent} className="process-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <div style={styles.processLabel} className="process-label">Процесс</div>
            <h2 style={styles.processHeading} className="process-heading">Как я работаю</h2>
          </motion.div>

          <div style={styles.processWrapper} className="process-wrapper">
            {/* Decorative Line with Pulse */}
            <div style={styles.processLineDecoration} className="process-line-decoration">
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, bottom: 0,
                  width: '150px',
                  background: 'linear-gradient(90deg, transparent 0%, #D4A574 50%, transparent 100%)',
                  boxShadow: '0 0 20px rgba(212, 165, 116, 0.4)',
                }}
                animate={{
                  x: ['-100%', '1000%'], // Move across 
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1
                }}
              />
            </div>

            <div style={styles.processGrid} className="process-grid">
              {processSteps.map((step, i) => (
                <ProcessCard
                  key={step.id}
                  step={step}
                  index={i}
                  hoveredIndex={hoveredProcessIndex}
                  setHoveredIndex={setHoveredProcessIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section (Shared Layout) */}
      <section id="projects" style={styles.projectsSection} className="projects-section">
        <div style={styles.sectionHeader}>
          <div style={styles.sectionLabel}>Портфолио</div>
          <h2 style={styles.sectionTitle}>Проекты</h2>
        </div>

        <div style={styles.projectsGrid} className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setActiveProject(project)} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection} className="stats-section">
        <div style={styles.statsGrid} className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={styles.statItem}
            >
              <div style={styles.statValue} className="stat-value">
                {stat.value}
                <span style={styles.statSuffix}>{stat.suffix}</span>
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={styles.statsQuote}
        >
          «От твоей идеи — к точному воплощению. Никакого мусора между»
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.contactSection} className="contact-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.contactContent}
        >
          <h2 style={styles.contactTitle} className="contact-title">
            Есть идея?
            <br />
            Обсудим за 15 минут
          </h2>
          <p style={styles.contactText}>
            Если у тебя есть идея приложения, которое решит именно твою проблему — напиши.
          </p>
          <div style={styles.contactLinks}>
            <Magnetic>
              <a
                href="https://t.me/dreamrandomlab"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.contactLink}
              >
                <TelegramIcon />
                @dreamrandomlab
              </a>
            </Magnetic>
            <Magnetic>
              <a href="mailto:ilia.kozha@gmail.com" style={styles.contactLink}>
                <EmailIcon />
                ilia.kozha@gmail.com
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span>© 2025 Илья Кожа</span>
          <span style={styles.footerDivider}>·</span>
          <span>Вайб-код разработчик</span>
        </div>
      </footer>

      {/* Shared Layout Modal */}
      <AnimatePresence>
        {activeProject && (
          <div key="project-modal" style={styles.modalOverlay} className="modal-overlay" onClick={() => setActiveProject(null)}>
            <motion.div
              layoutId={`card-container-${activeProject.id}`}
              transition={spring}
              style={{ ...styles.modal, position: 'relative', overflow: 'hidden' }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                layoutId={`card-bg-${activeProject.id}`}
                style={{
                  position: 'absolute',
                  top: 0, bottom: 0, left: 0, right: 0,
                  background: '#fff',
                  borderRadius: '32px',
                  zIndex: 0
                }}
              />

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <button style={styles.modalClose} className="modal-close" onClick={() => setActiveProject(null)}>
                  ×
                </button>

                <motion.div layoutId={`card-accent-${activeProject.id}`} className="modal-accent" style={{ ...styles.modalAccent, backgroundColor: activeProject.color }} />

                <motion.h2 layoutId={`card-title-${activeProject.id}`} className="modal-title" style={styles.modalTitle}>
                  {activeProject.title}
                </motion.h2>
                <motion.p layoutId={`card-subtitle-${activeProject.id}`} className="modal-subtitle" style={styles.modalSubtitle}>
                  {activeProject.subtitle}
                </motion.p>
                <motion.p layoutId={`card-desc-${activeProject.id}`} className="modal-description" style={styles.modalDescription}>
                  {activeProject.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeProject.images.length > 0 && (
                    <div style={styles.modalGallery} className="modal-gallery">
                      <div style={styles.galleryLabel} className="gallery-label">Скриншоты</div>
                      <div style={styles.galleryGrid} className="gallery-grid">
                        {activeProject.images.map((img, i) => (
                          <div
                            key={`gallery-${activeProject.id}-${i}`}
                            style={styles.galleryItem}
                            className="gallery-item"
                            onClick={() => setZoomedImage(img)}
                          >
                            <Image
                              src={img}
                              alt={`${activeProject.title} скриншот ${i + 1}`}
                              fill
                              sizes="(max-width: 768px) 70vw, 300px"
                              style={styles.galleryImage}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeProject.link && (
                    <a href={activeProject.link} target="_blank" rel="noopener noreferrer" style={styles.modalLink} className="modal-link">
                      Открыть проект →
                    </a>
                  )}
                </motion.div>

                <div style={{ marginTop: 'auto' }}>
                  <div style={styles.modalTags} className="modal-tags">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} style={styles.modalTag} className="modal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {zoomedImage && (
          <motion.div
            key="zoomed-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
            onClick={() => setZoomedImage(null)}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1200px' }}>
              <Image
                src={zoomedImage}
                alt="Zoomed"
                fill
                sizes="100vw"
                quality={100}
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
            <button
              style={{
                position: 'absolute',
                top: '32px',
                right: '32px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '24px',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => setZoomedImage(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Icons ---
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

// --- Styles ---

const styles = {
  container: {
    minHeight: '100vh',
    position: 'relative',
    background: 'linear-gradient(180deg, #F5F2EB 0%, #EBE6DE 50%, #F5F2EB 100%)',
    overflow: 'hidden',
  },
  cursorGlow: {
    position: 'fixed',
    top: 0, left: 0,
    width: '30vh',
    height: '30vh',
    background: 'radial-gradient(circle, rgba(199, 91, 58, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 0,
    filter: 'blur(30px)'
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
    zIndex: 0,
  },
  gridLines: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
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
    padding: '8px 4px',
    display: 'block',
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
    backdropFilter: 'blur(10px)',
  },
  heroImageWrapper: {
    position: 'relative',
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
  },
  decorCircle: {
    position: 'absolute',
    top: '-30px',
    right: '-30px',
    width: '100px',
    height: '100px',
    border: '2px solid rgba(199, 91, 58, 0.2)',
    borderRadius: '50%',
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
    zIndex: 10,
  },
  scrollLine: {
    width: '1px',
    height: '60px',
    background: 'linear-gradient(180deg, rgba(45, 42, 38, 0), #2D2A26)',
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
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s ease',
  },
  manifestIcon: {
    fontSize: '32px',
    marginBottom: '24px',
    color: '#C75B3A',
  },
  manifestCardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '24px',
    marginBottom: '16px',
    color: '#2D2A26',
  },
  manifestCardText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#5C5954',
  },
  processSection: {
    padding: '120px 0',
    position: 'relative',
  },
  processWrapper: {
    background: '#1A1816',
    borderRadius: '40px',
    padding: '64px',
    margin: '64px 32px 0',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
  },
  processLineDecoration: {
    position: 'absolute',
    top: '320px',
    left: '0',
    right: '0',
    height: '1px',
    background: 'rgba(255, 255, 255, 0.05)',
    pointerEvents: 'none',
    zIndex: 2,
    overflow: 'hidden',
  },
  processContent: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '0 64px',
    position: 'relative',
    zIndex: 1,
  },
  processLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#8B9A7D',
    marginBottom: '24px',
  },
  processHeading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '64px',
    color: '#2D2A26',
  },
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
  },
  processCard: {
    position: 'relative',
    padding: '48px 40px',
    borderRadius: '32px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    overflow: 'hidden',
    cursor: 'default',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-color 0.3s ease',
  },
  spotlight: {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    opacity: 0.5,
  },
  processCardContent: {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  processStepNumber: {
    position: 'absolute',
    top: '-30px',
    right: '-20px',
    fontSize: '180px',
    fontFamily: "'Playfair Display', serif",
    fontWeight: '700',
    color: 'transparent',
    WebkitTextStroke: '1px rgba(255,255,255,0.12)',
    lineHeight: 1,
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.6,
  },
  processIconWrapper: {
    width: '72px',
    height: '72px',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '56px',
    fontSize: '28px',
    color: '#D4A574',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
  processTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '26px',
    lineHeight: '1.2',
    minHeight: '64px',
    marginBottom: '24px',
    color: '#FAF8F5',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'start',
  },
  processText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'rgba(250, 248, 245, 0.6)',
    position: 'relative',
    zIndex: 1,
    maxWidth: '90%',
  },
  projectsSection: {
    padding: '100px 64px',
    position: 'relative',
    zIndex: 2,
  },
  sectionHeader: {
    maxWidth: '1280px',
    margin: '0 auto',
    marginBottom: '60px',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '32px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  projectCard: {
    borderRadius: '24px',
    padding: '32px',
    cursor: 'pointer',
    minHeight: '420px',
  },
  projectAccent: {
    width: '40px',
    height: '4px',
    borderRadius: '2px',
    marginTop: '16px',
    marginBottom: '24px',
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
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#8B8680',
    background: 'rgba(255, 255, 255, 0.4)',
    padding: '6px 12px',
    borderRadius: '100px',
  },
  projectGalleryHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#8B8680',
    background: 'rgba(255, 255, 255, 0.4)',
    padding: '6px 12px',
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
    fontSize: '16px',
    color: '#5C5954',
    marginBottom: '16px',
    opacity: 0.8,
  },
  projectDescription: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#5C5954',
    marginBottom: '24px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  projectResult: {
    display: 'flex',
    gap: '8px',
    alignItems: 'start',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    color: '#2D2A26',
    marginBottom: '24px',
    padding: '12px',
    background: 'rgba(240, 240, 235, 0.5)',
    borderRadius: '12px',
  },
  projectResultIcon: {
    color: '#4A6145',
    fontWeight: 'bold',
  },
  projectTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  projectTag: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '12px',
    color: '#5C5954',
    padding: '4px 12px',
    borderRadius: '100px',
    border: '1px solid rgba(45, 42, 38, 0.08)',
  },
  statsSection: {
    padding: '100px 64px',
    position: 'relative',
    zIndex: 2,
    background: '#2D2A26',
    color: '#FAF8F5',
    marginTop: '100px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '80px',
    maxWidth: '1280px',
    margin: '0 auto',
    marginBottom: '120px',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '64px',
    fontWeight: '500',
    marginBottom: '16px',
    color: '#FAF8F5',
  },
  statSuffix: {
    fontSize: '32px',
    opacity: 0.5,
    marginLeft: '4px',
  },
  statLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    opacity: 0.6,
  },
  statsQuote: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(24px, 4vw, 40px)',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.4',
    opacity: 0.9,
  },
  contactSection: {
    padding: '160px 64px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  contactContent: {
    textAlign: 'center',
    maxWidth: '700px',
  },
  contactTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(40px, 5vw, 64px)',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '32px',
    lineHeight: '1.2',
  },
  contactText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '18px',
    color: '#5C5954',
    marginBottom: '48px',
    lineHeight: '1.6',
  },
  contactLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    flexWrap: 'wrap',
  },
  contactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '18px',
    fontFamily: "'Outfit', sans-serif",
    color: '#2D2A26',
    textDecoration: 'none',
    padding: '12px 24px',
    borderRadius: '100px',
    background: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid rgba(45, 42, 38, 0.1)',
    transition: 'all 0.3s ease',
  },
  footer: {
    padding: '40px 64px',
    borderTop: '1px solid rgba(45, 42, 38, 0.05)',
  },
  footerContent: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    color: '#8B8680',
  },
  footerDivider: {
    margin: '0 12px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(45, 42, 38, 0.6)',
    backdropFilter: 'blur(8px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  modal: {
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    padding: '64px 64px 80px',
    overflowY: 'auto',
  },
  modalClose: {
    position: 'absolute',
    top: '32px',
    right: '32px',
    background: 'none',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    color: '#2D2A26',
    opacity: 0.5,
    zIndex: 10,
    transition: 'opacity 0.2s',
  },
  modalAccent: {
    width: '60px',
    height: '6px',
    borderRadius: '3px',
    marginBottom: '32px',
  },
  modalTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '48px',
    fontWeight: '500',
    color: '#2D2A26',
    marginBottom: '16px',
  },
  modalSubtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '20px',
    color: '#5C5954',
    marginBottom: '32px',
  },
  modalDescription: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#2D2A26',
    marginBottom: '48px',
    maxWidth: '700px',
  },
  modalGallery: {
    marginBottom: '48px',
  },
  galleryLabel: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#8B8680',
    marginBottom: '24px',
  },
  galleryGrid: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    gap: '16px',
    paddingBottom: '20px',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none',  // IE 10+
    WebkitOverflowScrolling: 'touch',
  },
  galleryItem: {
    minWidth: '280px',
    flex: '0 0 auto',
    scrollSnapAlign: 'start',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
    position: 'relative',
    aspectRatio: '16/10',
    background: '#F5F5F7',
    cursor: 'zoom-in',
    transition: 'transform 0.2s',
  },
  galleryImage: {
    objectFit: 'cover',
    objectPosition: 'top',
  },
  modalLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '16px',
    marginBottom: '24px',
    padding: '12px 28px',
    background: '#2D2A26',
    color: '#FAF8F5',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    borderRadius: '100px',
    boxShadow: '0 4px 12px rgba(45, 42, 38, 0.1)',
    transition: 'all 0.2s ease',
  },
  modalTags: {
    display: 'flex',
    gap: '12px',
  },
  modalTag: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    color: '#5C5954',
    padding: '8px 20px',
    borderRadius: '100px',
    background: 'rgba(45, 42, 38, 0.05)',
  },
};
