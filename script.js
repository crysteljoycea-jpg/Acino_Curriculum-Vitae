document.getElementById('year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      sectionLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-22% 0px -68% 0px' });

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
  });
}

const chatPanel = document.getElementById('cv-chat');
const chatLauncher = document.querySelector('.chat-launcher');
const chatClose = document.querySelector('.chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

function setChatOpen(open) {
  chatPanel.hidden = !open;
  chatPanel.setAttribute('aria-hidden', String(!open));
  chatLauncher.setAttribute('aria-expanded', String(open));
  if (open) chatInput.focus();
  else chatLauncher.focus();
}

function addChatMessage(text, sender, emailLink = false) {
  const message = document.createElement('div');
  message.className = `chat-message ${sender}-message`;

  if (emailLink) {
    message.append(document.createTextNode(text));
    const link = document.createElement('a');
    link.href = 'mailto:crysteljoycea@gmail.com';
    link.textContent = 'crysteljoycea@gmail.com';
    message.append(link);
  } else {
    message.textContent = text;
  }

  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function answerQuestion(question) {
  const text = question.toLowerCase();

  if (/\b(hi|hello|hey)\b/.test(text)) {
    return { text: 'Hello! Ask me about Crystel’s projects, skills, education, or how to get in touch.' };
  }
  if (/contact|email|reach|phone|number/.test(text)) {
    return { text: 'You can reach Crystel by email at ', emailLink: true };
  }
  if (/skill|technology|tech stack|language|editor|editing|video/.test(text)) {
    return { text: 'Development: HTML, CSS, JavaScript, React, Python. Tools: Firebase, Git/GitHub, cybersecurity. Practice: project coordination, documentation, video editing, teamwork.' };
  }
  if (/project|work|portfolio|capstone|pineapple|drone/.test(text)) {
    return { text: 'Crystel is the project manager and documentarian for a capstone using drone imagery and computer vision to classify bearing and non-bearing pineapple plants (React, Firebase, Python). She also designed and built this responsive portfolio website.' };
  }
  if (/education|school|degree|college|university|study/.test(text)) {
    return { text: 'Crystel is a fourth-year BSIT student at Davao del Norte State College (BSIT 4-G). She is also completing an IBM SkillsBuild cybersecurity learning path.' };
  }
  if (/experience|intern|career|objective|job/.test(text)) {
    return { text: 'Crystel is seeking an internship or entry-level opportunity to contribute to useful software and grow with a collaborative team. Her listed experience is academic and personal project work.' };
  }
  if (/where|location|live|based/.test(text)) {
    return { text: 'Crystel is based in Panabo City, Davao del Norte, Philippines.' };
  }

  return { text: 'I can help with questions about Crystel’s skills, projects, education, experience, location, or contact details. Try one of the suggested questions below.' };
}

function sendChatQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addChatMessage(cleanQuestion, 'user');
  const reply = answerQuestion(cleanQuestion);
  addChatMessage(reply.text, 'bot', reply.emailLink);
}

chatLauncher.addEventListener('click', () => setChatOpen(chatPanel.hidden));
chatClose.addEventListener('click', () => setChatOpen(false));
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendChatQuestion(chatInput.value);
  chatInput.value = '';
  chatInput.focus();
});
chatMessages.addEventListener('click', (event) => {
  const suggestion = event.target.closest('.chat-suggestions button');
  if (suggestion) sendChatQuestion(suggestion.textContent);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !chatPanel.hidden) setChatOpen(false);
});
