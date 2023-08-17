import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import moon from '../assets/moon.jpg';
import gitHubImage from '../assets/github.jpg';
import linkedinImage from '../assets/linkedin.jpg';
import ContactModal from './contactModal';
import surf from '../assets/surf.jpg'
import jump from '../assets/jump.jpg'
import CV from '../assets/CV Hugh.pdf'
import mountain from '../assets/mountain.jpg'
import contact from '../assets/contact.jpg'
import popSound from '../assets/pop.wav';
import Nav from './nav';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Bubble {
  id: string;
  text: string;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  color: string;
  photo?: string;
  url?: string;
  endpoint?: string;
}

function Bubbles() {
  const bubbleData: Bubble[] = [
    { id: 'about', text: 'About Me', x: 0, y: 0, speedX: 0, speedY: 0, color: 'bg-teal-500 hover:bg-teal-700', endpoint: '/about' },
    { id: 'experience', text: 'Experience', x: 0, y: 0, speedX: 0, speedY: 0, color: 'bg-purple-500 hover:bg-purple-600', endpoint: '/experience' },
    { id: 'projects', text: 'Projects', x: 0, y: 0, speedX: 0, speedY: 0, color: 'bg-blue-500 hover:bg-blue-600', endpoint: '/projects' },
    { id: 'social media', text: 'Social Media', x: 0, y: 0, speedX: 0, speedY: 0, color: 'bg-amber-500 hover:bg-amber-600' },
    { id: 'profile', text: '', x: 0, y: 0, speedX: 0, speedY: 0, color: 'bg-gray-200 hover:bg-gray-300', photo: surf },
    { id: 'cv', text: 'Resume', x: 0, y: 0, speedX: 0, speedY: 0, color: 'bg-green-500 hover:bg-green-600'},
  ];      
  const [popAudio] = useState(new Audio(popSound));
  const [showModal, setShowModal] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>(bubbleData);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    const bubbleSize = isSmallScreen ? 140 : 200;
    const maxSpeed = 0.5;
    const radius = isSmallScreen ? 70 : 100;
    const makeSmooth = 2;

    function distance(x: number, y: number) {
      return Math.sqrt(x * x + y * y);
    }

    function randInit(bubble: Bubble) {
      bubble.x = Math.random() * (window.innerWidth - bubbleSize - radius - radius) + radius;
      bubble.y = Math.random() * (window.innerHeight - bubbleSize - radius - radius) + radius;
      bubble.speedX = (Math.random() - 0.5) * maxSpeed;
      bubble.speedY = (Math.random() - 0.5) * maxSpeed;
    }

    function moveBubble(bubble: Bubble, index: number, bubbles: Bubble[]) {
      let newX = bubble.x + bubble.speedX;
      let newY = bubble.y + bubble.speedY;

      if (newX < radius + makeSmooth) {
        bubble.speedX = Math.abs(bubble.speedX);
      } else if (newX > window.innerWidth - (radius + makeSmooth)) {
        bubble.speedX = -Math.abs(bubble.speedX);
      }
      let smallScreenPadding = isSmallScreen ? 20 : 45;
      if (newY < radius + makeSmooth) {
        bubble.speedY = Math.abs(bubble.speedY);
      } else if (newY > window.innerHeight - (bubbleSize) + (smallScreenPadding)  ) {
        bubble.speedY = -Math.abs(bubble.speedY);
      }

      for (let i = index + 1; i < bubbles.length; i++) {
        console.log(isSmallScreen);
        const otherBubble = bubbles[i];
        const dx = bubble.x - otherBubble.x;
        const dy = bubble.y - otherBubble.y;
        const distanceBetweenBubbles = distance(dx, dy);
        const totalRadius = bubbleSize;

        if (distanceBetweenBubbles < totalRadius) {
          const angle = Math.atan2(dy, dx);
          const totalSpeed = Math.abs(bubble.speedX) + Math.abs(bubble.speedY) + Math.abs(otherBubble.speedX) + Math.abs(otherBubble.speedY);

          bubble.speedX = Math.cos(angle) * totalSpeed;
          bubble.speedY = Math.sin(angle) * totalSpeed;
          otherBubble.speedX = -Math.cos(angle) * totalSpeed;
          otherBubble.speedY = -Math.sin(angle) * totalSpeed;

          newX = bubble.x + bubble.speedX;
          newY = bubble.y + bubble.speedY;
        }
      }

      bubble.speedX = Math.min(Math.max(bubble.speedX, -maxSpeed), maxSpeed);
      bubble.speedY = Math.min(Math.max(bubble.speedY, -maxSpeed), maxSpeed);

      bubble.x = newX;
      bubble.y = newY;
    }

    function update() {
      setBubbles((oldBubbles) =>
        oldBubbles.map((bubble, index) => {
          moveBubble(bubble, index, oldBubbles);
          return bubble;
        })
      );
      animationFrameId = requestAnimationFrame(update);
    }

    setBubbles((oldBubbles) =>
      oldBubbles.map((bubble) => {
        randInit(bubble);
        return bubble;
      })
    );

    let animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isSmallScreen]);

  function handleBubbleClick(bubble: Bubble) {
    if (bubble.endpoint) {
      navigate(bubble.endpoint);
    } 
    if (bubble.url) {
      window.open(bubble.url, '_blank');
    }
    if (bubble.id === 'phone') {
      setShowModal(true);
    }
    if (bubble.id === 'profile') {
      if (bubble.photo === surf) {
        bubble.photo = mountain
      }
      else if (bubble.photo === mountain) {
        bubble.photo = moon
      }
      else if (bubble.photo === moon) {
        bubble.photo = jump
      }
      else {
        bubble.photo = surf
      }
    }
      

    
    if (bubble.id === 'cv') {
      const link = document.createElement('a');
      link.href = CV; 
      link.download = 'CV_Hugh_Avery.pdf'; 
      link.click();
    }
    if (bubble.id === 'social media') {
      popAudio.play();

      const radius = 100;
      const github = { id: 'github', text: '', x: bubble.x - radius, y: bubble.y, speedX: -bubble.speedX, speedY: bubble.speedY, color: 'bg-slate-950 hover:bg-slate-800', photo: gitHubImage, url:'https://github.com/hughavery'} as const ;
      const phoneAndMail = { id: 'phone', text: '', x: bubble.x, y: bubble.y - radius, speedX: bubble.speedX, speedY: bubble.speedY, color: 'bg-red-500 hover:bg-red-600', photo: contact} as const;
      const linkedin = { id: 'linkedin', text: '', x: bubble.x + radius, y: bubble.y, speedX: bubble.speedX, speedY: bubble.speedY, color: 'bg-blue-600 hover:bg-blue-700', photo: linkedinImage, url:'https://www.linkedin.com/in/hugh-avery-b11214206'} as const;
      const updatedBubbles = [...bubbles.filter((b) => b.id !== 'social media'), github, linkedin, phoneAndMail];
      setBubbles(updatedBubbles);
    }
  }
  
  function closeModal() {
    setShowModal(false);
  }

  const renderBubbles = () =>
  bubbles.map((bubble) => {
  const bubbleColor = bubble.color;


  return (
    <div
      key={bubble.id}
      className={`bubble font-bold text-gray-100 font-sans select-none [-webkit-tap-highlight-color:transparent] ${bubbleColor}`}
      style={{ left: bubble.x, top: bubble.y}}
      onClick={() => handleBubbleClick(bubble)}
    >
      {bubble.photo ? (
        <img
          src={bubble.photo}
          alt="Profile"
          className="object-cover w-full h-full rounded-full"
        />
      ) : (
        bubble.text
      )}
    </div>
  );
});


  return (
    <body>
      
      <Nav />
      <main>{renderBubbles()}</main>
      {showModal && <ContactModal onClose={closeModal} />}
    </body>
  );
}

export default Bubbles;
