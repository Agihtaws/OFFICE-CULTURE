import React, { useState, useEffect, useRef } from 'react';
import './OfficeScene.css';

const OfficeScene = () => {
  const [isScreenOn, setIsScreenOn] = useState(true);
  const [plantGrowth, setPlantGrowth] = useState(0);
  const [lastWatered, setLastWatered] = useState(Date.now());
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState([
    { id: 1, text: 'Team meeting at 2pm', color: '#ffeb3b', rotation: -3 },
    { id: 2, text: 'Call John about project', color: '#4fc3f7', rotation: 2 },
    { id: 3, text: 'Finish CSS art!', color: '#ff8a65', rotation: -1 }
  ]);
  const [activeNote, setActiveNote] = useState(null);
  const [showMeeting, setShowMeeting] = useState(false);
  const [meetingParticipants, setMeetingParticipants] = useState([
    { id: 1, name: 'John', avatar: '👨‍💼', status: 'speaking' },
    { id: 2, name: 'Sarah', avatar: '👩‍💼', status: 'muted' },
    { id: 3, name: 'Alex', avatar: '🧑‍💻', status: 'camera-off' },
    { id: 4, name: 'You', avatar: '😊', status: 'active' }
  ]);
  const [paperAirplanes, setPaperAirplanes] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const sceneRef = useRef(null);
  const customizePanelRef = useRef(null);
  const [coffeeBreak, setCoffeeBreak] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [coffeeLevel, setCoffeeLevel] = useState(0); // 0 to 100
  const [notifications, setNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(1);
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [personalItems, setPersonalItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [skyColor, setSkyColor] = useState('#87CEEB');
  const [weather, setWeather] = useState({
    condition: 'sunny', // sunny, cloudy, rainy, snowy
    temperature: 72,
    location: 'Office City'
  });
  const [showWaterCooler, setShowWaterCooler] = useState(false);
  const [waterCoolerChat, setWaterCoolerChat] = useState('');
  const [waterBubbles, setWaterBubbles] = useState([]);

  // Office Pet state variables
  const [showPet, setShowPet] = useState(false);
  const [petType, setPetType] = useState('cat');
  const [petPosition, setPetPosition] = useState({ x: 0, y: 0 });
  const [petAction, setPetAction] = useState('idle');
  
  // To-Do List state variables
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: 'Finish project proposal', completed: false },
    { id: 2, text: 'Schedule team meeting', completed: true },
    { id: 3, text: 'Review client feedback', completed: false }
  ]);
  const [newTodoText, setNewTodoText] = useState('');
  const [showTodoList, setShowTodoList] = useState(false);
  const [nextTodoId, setNextTodoId] = useState(4);
  const [showCall, setShowCall] = useState(false);
  const [showCssChallenge, setShowCssChallenge] = useState(false);
  
  // Weather effect state variables
  const [raindrops, setRaindrops] = useState([]);
  const [snowflakes, setSnowflakes] = useState([]);
  const [cloudPositions, setCloudPositions] = useState([
    { id: 1, left: '10%', top: '30px', size: 50 },
    { id: 2, left: '60%', top: '15px', size: 40 }
  ]);
  const [windIntensity, setWindIntensity] = useState(0);

  const toggleScreen = () => {
    if (!showMeeting) { // Don't toggle screen if meeting is active
      setIsScreenOn(!isScreenOn);
    }
  };

  // Toggle water cooler chat
  const toggleWaterCooler = () => {
    if (!showWaterCooler) {
      // Generate random chat when opening
      generateWaterCoolerChat();
      // Generate bubbles
      generateBubbles();
    }
    setShowWaterCooler(!showWaterCooler);
  };

  // Generate random water cooler chat
  const generateWaterCoolerChat = () => {
    const chats = [
      "Did you see the game last night?",
      "How was your weekend?",
      "The weather's been crazy lately, right?",
      "Have you tried that new lunch spot?",
      "Any plans for the holidays?",
      "That meeting could have been an email...",
      "I can't believe it's only Tuesday.",
      "The coffee machine is broken again.",
      "Did you hear about the new company policy?",
      "I think I need more caffeine today.",
      "Printer's jammed again. Classic.",
      "Is it 5 o'clock yet?",
      "Did you watch that new show everyone's talking about?",
      "I brought cookies for the break room!",
      "My commute was terrible this morning."
    ];
    
    const randomIndex = Math.floor(Math.random() * chats.length);
    setWaterCoolerChat(chats[randomIndex]);
  };

  // Generate water bubbles
  const generateBubbles = () => {
    const newBubbles = [];
    for (let i = 0; i < 10; i++) {
      newBubbles.push({
        id: i,
        size: Math.random() * 10 + 5,
        left: Math.random() * 80 + 10,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 3
      });
    }
    setWaterBubbles(newBubbles);
  };

  // Function to generate weather effects based on condition
  const generateWeatherEffects = (condition) => {
    switch(condition) {
      case 'rainy':
        generateRain();
        break;
      case 'snowy':
        generateSnow();
        break;
      case 'cloudy':
        generateClouds();
        break;
      default:
        // Clear previous weather effects
        setRaindrops([]);
        setSnowflakes([]);
        setCloudPositions([
          { id: 1, left: '10%', top: '30px', size: 50 },
          { id: 2, left: '60%', top: '15px', size: 40 }
        ]);
        setWindIntensity(0);
        break;
    }
  };

  // Generate rain effect
  const generateRain = () => {
    const drops = [];
    for (let i = 0; i < 50; i++) {
      drops.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: Math.random() * 0.5 + 0.7
      });
    }
    setRaindrops(drops);
    setSnowflakes([]);
    setWindIntensity(Math.random() * 2 + 1);
  };

  // Generate snow effect
  const generateSnow = () => {
    const flakes = [];
    for (let i = 0; i < 40; i++) {
      flakes.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 5 + 3,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 5
      });
    }
    setSnowflakes(flakes);
    setRaindrops([]);
    setWindIntensity(Math.random() * 1 + 0.5);
  };

  // Generate cloudy effect
  const generateClouds = () => {
    const clouds = [];
    for (let i = 0; i < 5; i++) {
      clouds.push({
        id: i,
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 50 + 5}px`,
        size: Math.random() * 30 + 30
      });
    }
    setCloudPositions(clouds);
    setRaindrops([]);
    setSnowflakes([]);
    setWindIntensity(Math.random() * 1.5 + 0.5);
  };

  // Function to change weather randomly
  const changeWeather = () => {
    const conditions = ['sunny', 'cloudy', 'rainy', 'snowy'];
    const newCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    // Temperature ranges based on condition
    let tempRange;
    switch(newCondition) {
      case 'sunny':
        tempRange = { min: 70, max: 95 };
        break;
      case 'cloudy':
        tempRange = { min: 60, max: 80 };
        break;
      case 'rainy':
        tempRange = { min: 50, max: 70 };
        break;
      case 'snowy':
        tempRange = { min: 20, max: 35 };
        break;
      default:
        tempRange = { min: 60, max: 80 };
    }
    
    const newTemp = Math.floor(Math.random() * (tempRange.max - tempRange.min + 1) + tempRange.min);
    
    setWeather({
      ...weather,
      condition: newCondition,
      temperature: newTemp
    });
    
    // Generate appropriate weather effects
    generateWeatherEffects(newCondition);
  };

  // Effect to change weather periodically
  useEffect(() => {
    // Change weather initially
    changeWeather();
    
    // Change weather every 2-5 minutes
    const interval = setInterval(changeWeather, Math.random() * 180000 + 120000);
    
    return () => clearInterval(interval);
  }, []);

  // Effect to update weather display based on time of day and weather condition
  useEffect(() => {
    // This function will be called whenever timeOfDay or weather.condition changes
    const updateWeatherDisplay = () => {
      // Clear any existing animations/intervals
      const skyElements = document.querySelector('.sky-elements');
      if (!skyElements) return;
      
      // Apply appropriate visibility to sun/moon based on time and weather
      const sun = skyElements.querySelector('.sun');
      const moon = skyElements.querySelector('.moon');
      const clouds = skyElements.querySelectorAll('.cloud');
      const stars = skyElements.querySelectorAll('.star');
      
      if (weather.condition === 'rainy') {
        // Rainy weather - hide sun during day, show moon at night
        if (sun) sun.style.opacity = '0';
        if (moon && (timeOfDay === 'night')) {
          moon.style.opacity = '0.3'; // Dimmed moon at night
        } else if (moon) {
          moon.style.opacity = '0';
        }
        // Dim the clouds
        clouds.forEach(cloud => {
          cloud.style.opacity = '0.5';
        });
        // Stars very dim at night during rain
        if (timeOfDay === 'night') {
          stars.forEach(star => {
            star.style.opacity = '0.2';
          });
        } else {
          stars.forEach(star => {
            star.style.opacity = '0';
          });
        }
      } 
      else if (weather.condition === 'cloudy') {
        // Cloudy weather - partially hide sun/moon
        if (timeOfDay === 'night') {
          if (sun) sun.style.opacity = '0';
          if (moon) moon.style.opacity = '0.6';
          stars.forEach(star => {
            star.style.opacity = '0.3';
          });
        } else {
          if (sun) sun.style.opacity = '0.6';
          if (moon) moon.style.opacity = '0';
          stars.forEach(star => {
            star.style.opacity = '0';
          });
        }
        // Make clouds more visible
        clouds.forEach(cloud => {
          cloud.style.opacity = '1';
          cloud.style.transform = `scale(1.2)`;
        });
      }
      else if (weather.condition === 'snowy') {
        // Snowy weather - dim sun, brighten moon at night
        if (timeOfDay === 'night') {
          if (sun) sun.style.opacity = '0';
          if (moon) moon.style.opacity = '0.8';
          stars.forEach(star => {
            star.style.opacity = '0.7';
          });
        } else {
          if (sun) sun.style.opacity = '0.3';
          if (moon) moon.style.opacity = '0';
          stars.forEach(star => {
            star.style.opacity = '0';
          });
        }
        // Lighten clouds
        clouds.forEach(cloud => {
          cloud.style.opacity = '0.8';
          cloud.style.backgroundColor = '#f5f5f5';
        });
      }
      else {
        // Sunny weather - standard day/night cycle
        if (timeOfDay === 'night') {
          if (sun) sun.style.opacity = '0';
          if (moon) moon.style.opacity = '1';
          stars.forEach(star => {
            star.style.opacity = '1';
          });
        } else {
          if (sun) sun.style.opacity = '1';
          if (moon) moon.style.opacity = '0';
          stars.forEach(star => {
            star.style.opacity = '0';
          });
        }
        // Adjust cloud visibility
        clouds.forEach(cloud => {
          cloud.style.opacity = timeOfDay === 'night' ? '0.3' : '0.9';
        });
      }
    };
    
    updateWeatherDisplay();
  }, [timeOfDay, weather.condition]);

  const startCoffeeBreak = () => {
    setCoffeeBreak(true);
    setCoffeeLevel(0);
    setBreakTimeLeft(15 * 60); // Reset to 15 minutes
  };

  const endCoffeeBreak = () => {
    setCoffeeBreak(false);
  };

  const handleCoffeeMugClick = () => {
    if (!coffeeBreak) {
      startCoffeeBreak();
    } else {
      endCoffeeBreak();
    }
  };

  const waterPlant = () => {
    if (plantGrowth < 3) {
      setPlantGrowth(prev => Math.min(prev + 1, 3));
    }
    setLastWatered(Date.now());
  };

  const handleNoteClick = (id) => {
    // First, handle turning off any active interfaces
    if (id === 1) {
      // If clicking on Team meeting note
      if (showCall) {
        setShowCall(false);
      }
      if (showCssChallenge) {
        setShowCssChallenge(false);
      }
      // Toggle meeting state
      setShowMeeting(!showMeeting);
    } 
    else if (id === 2) {
      // If clicking on Call John note
      if (showMeeting) {
        setShowMeeting(false);
      }
      if (showCssChallenge) {
        setShowCssChallenge(false);
      }
      // Toggle call state
      setShowCall(!showCall);
    }
    else if (id === 3) {
      // If clicking on "Finish CSS art!" note
      if (showMeeting) {
        setShowMeeting(false);
      }
      if (showCall) {
        setShowCall(false);
      }
      // Toggle CSS challenge site
      setShowCssChallenge(!showCssChallenge);
    }
    
    // Make sure screen is on for any interface
    if (!isScreenOn && (id === 1 || id === 2 || id === 3)) {
      setIsScreenOn(true);
    }
    
    // Set active note
    setActiveNote(id === activeNote ? null : id);
  };

  // Function to add a new notification
  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: nextNotificationId,
      message,
      type,
      timestamp: new Date()
    };
    
    setNotifications(prev => [...prev, newNotification]);
    setNextNotificationId(prev => prev + 1);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  // Function to remove a notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Toggle the customization panel
  const toggleCustomizePanel = () => {
    setShowCustomizePanel(!showCustomizePanel);
  };

  // Add a personal item to the desk
  const addPersonalItem = (item) => {
    const newItem = {
      id: Date.now(),
      type: item,
      position: { x: 300, y: 50 },
      rotation: 0,
      zIndex: personalItems.length + 10
    };
    setPersonalItems([...personalItems, newItem]);
  };

  // Remove a personal item from the desk
  const removePersonalItem = (id) => {
    setPersonalItems(personalItems.filter(item => item.id !== id));
  };

  // Start dragging an item
  const startDragging = (id) => {
    setSelectedItem(id);
  };

  // Stop dragging an item
  const stopDragging = () => {
    setSelectedItem(null);
  };

  // Handle item movement
  const moveItem = (e) => {
    if (selectedItem !== null && sceneRef.current) {
      const sceneRect = sceneRef.current.getBoundingClientRect();
      const x = e.clientX - sceneRect.left;
      const y = e.clientY - sceneRect.top;
      
      setPersonalItems(personalItems.map(item => {
        if (item.id === selectedItem) {
          return {
            ...item,
            position: { x, y }
          };
        }
        return item;
      }));
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Get the position of the send button
      const sendButton = document.querySelector('.send-button');
      const buttonRect = sendButton.getBoundingClientRect();
      const sceneRect = sceneRef.current.getBoundingClientRect();
      
      // Calculate position relative to the scene
      const startX = buttonRect.left - sceneRect.left + buttonRect.width/2;
      const startY = buttonRect.top - sceneRect.top + buttonRect.height/2;
      
      const newPlane = {
        id: Date.now(),
        message,
        path: Math.floor(Math.random() * 3), // Random flight path (0, 1, or 2)
        startX,
        startY,
        sent: false
      };
      
      setPaperAirplanes(prev => [...prev, newPlane]);
      setMessage('');
      setShowMessageBox(false);
      
      // Remove the plane after animation completes
      setTimeout(() => {
        setPaperAirplanes(prev => prev.filter(plane => plane.id !== newPlane.id));
      }, 3000); // Reduced from 5000ms to 3000ms for quicker animation
    }
  };

  const toggleMessageBox = () => {
    setShowMessageBox(!showMessageBox);
  };

  // Function to make a pet appear - IMPROVED to appear under desk
  const makePetAppear = () => {
    // Choose a pet type
    const pets = ['cat', 'dog'];
    const newPetType = pets[Math.floor(Math.random() * pets.length)];
    setPetType(newPetType);
    
    // Choose a starting position - now positioned under the desk
    const startPositions = [
      { x: 300, y: 20 },  // From left side under desk
      { x: 650, y: 20 }   // From right side under desk
    ];
    const startPos = startPositions[Math.floor(Math.random() * startPositions.length)];
    setPetPosition(startPos);
    
    // Show the pet
    setShowPet(true);
    setPetAction('enter');
    
    // After entering, make pet idle
    setTimeout(() => {
      setPetAction('idle');
      
      // After some time, make the pet do something
      setTimeout(() => {
        const actions = ['play', 'sleep', 'look'];
        const newAction = actions[Math.floor(Math.random() * actions.length)];
        setPetAction(newAction);
        
        // After the action, make the pet leave
        setTimeout(() => {
          setPetAction('leave');
          
          // Finally hide the pet
          setTimeout(() => {
            setShowPet(false);
          }, 3000);
        }, 5000);
      }, 5000);
    }, 3000);
  };
  
  // To-Do List functions
  // Toggle to-do list visibility
  const toggleTodoList = () => {
    setShowTodoList(!showTodoList);
  };

  // Add new to-do item
  const addTodoItem = (e) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;
    
    const newItem = {
      id: nextTodoId,
      text: newTodoText,
      completed: false
    };
    
    setTodoItems([...todoItems, newItem]);
    setNextTodoId(nextTodoId + 1);
    setNewTodoText('');
  };

  // Toggle to-do item completion
  const toggleTodoCompletion = (id) => {
    setTodoItems(todoItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Delete to-do item
  const deleteTodoItem = (id) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  // Handle clicks outside the customize panel
  const handleClickOutside = (e) => {
    if (
      showCustomizePanel && 
      customizePanelRef.current && 
      !customizePanelRef.current.contains(e.target) &&
      !e.target.classList.contains('customize-button')
    ) {
      setShowCustomizePanel(false);
    }
  };

  // Effect to add click outside listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCustomizePanel]);

  // Effect to make pets appear periodically
  useEffect(() => {
    // Initial delay before first pet
    const initialDelay = setTimeout(() => {
      makePetAppear();
      
      // Set up interval for future appearances
      const interval = setInterval(() => {
        // 30% chance of pet appearing
        if (Math.random() < 0.3) {
          makePetAppear();
        }
      }, 60000); // Check every minute
      
      return () => clearInterval(interval);
    }, 10000); // First pet after 10 seconds
    
    return () => clearTimeout(initialDelay);
  }, []);

  // Effect to show random notifications
  useEffect(() => {
    const notificationMessages = [
      { message: "New email received from Sarah", type: "email" },
      { message: "Meeting in 5 minutes", type: "calendar" },
      { message: "Reminder: Submit weekly report", type: "reminder" },
      { message: "John commented on your document", type: "comment" },
      { message: "System update available", type: "system" },
      { message: "Project deadline tomorrow", type: "deadline" }
    ];
    
    // Show a notification every 20-40 seconds
    const notificationInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * notificationMessages.length);
      addNotification(
        notificationMessages[randomIndex].message,
        notificationMessages[randomIndex].type
      );
    }, Math.random() * 20000 + 20000); // Between 20 and 40 seconds
    
    return () => clearInterval(notificationInterval);
  }, []);

  // Effect to handle day/night cycle
  useEffect(() => {
    const updateTimeOfDay = () => {
      const currentHour = new Date().getHours();
      
      // Early morning (5-7 AM)
      if (currentHour >= 5 && currentHour < 7) {
        setTimeOfDay('dawn');
        setSkyColor('#FFB74D'); // Orange-ish sunrise
      }
      // Morning to afternoon (7 AM - 5 PM)
      else if (currentHour >= 7 && currentHour < 17) {
        setTimeOfDay('day');
        setSkyColor('#87CEEB'); // Sky blue
      }
      // Evening/sunset (5-8 PM)
      else if (currentHour >= 17 && currentHour < 20) {
        setTimeOfDay('sunset');
        setSkyColor('#FF7043'); // Orange-red sunset
      }
      // Night (8 PM - 5 AM)
      else {
        setTimeOfDay('night');
        setSkyColor('#1A237E'); // Dark blue night
      }
    };
    
    // Update immediately
    updateTimeOfDay();
    
    // Then update every minute
    const interval = setInterval(updateTimeOfDay, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Coffee break timer effect
  useEffect(() => {
    let timer;
    if (coffeeBreak && breakTimeLeft > 0) {
      timer = setInterval(() => {
        setBreakTimeLeft(prev => prev - 1);
        
        // Gradually fill the coffee cup
        if (coffeeLevel < 100) {
          setCoffeeLevel(prev => Math.min(prev + (100 / (15 * 60)) * 2, 100));
        }
      }, 1000);
    } else if (coffeeBreak && breakTimeLeft === 0) {
      setCoffeeBreak(false);
    }
    
    return () => clearInterval(timer);
  }, [coffeeBreak, breakTimeLeft, coffeeLevel]);

  // Update clock time - UPDATED to refresh every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Plant slowly wilts if not watered
  useEffect(() => {
    const interval = setInterval(() => {
      const timeElapsed = Date.now() - lastWatered;
      // If not watered for 30 seconds, start wilting
      if (timeElapsed > 30000 && plantGrowth > 0) {
        setPlantGrowth(prev => Math.max(prev - 1, 0));
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [lastWatered, plantGrowth]);

  // Time calculation
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate angles - standard clock angles
  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

  // Add console logs for debugging
  console.log(`Current time: ${hours}:${minutes}:${seconds}`);
  console.log(`Angles - Hour: ${hourAngle}, Minute: ${minuteAngle}, Second: ${secondAngle}`);

  return (
    <div 
      className={`office-scene ${timeOfDay}`}
      ref={sceneRef}
      onMouseMove={moveItem}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      style={{ backgroundColor: skyColor }}
      data-weather={weather.condition}
    >
      {/* Sky elements */}
      <div className="sky-elements">
        <div className="sun"></div>
        <div className="moon"></div>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        
        {/* Additional clouds for cloudy weather */}
        {weather.condition === 'cloudy' && cloudPositions.map(cloud => (
          <div 
            key={cloud.id}
            className="cloud extra-cloud"
            style={{
              left: cloud.left,
              top: cloud.top,
              width: `${cloud.size}px`,
              height: `${cloud.size / 2.5}px`,
              animation: `float-cloud ${5 + Math.random() * 5}s infinite alternate`
            }}
          ></div>
        ))}
        
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
        
        {/* Rain effect */}
        {weather.condition === 'rainy' && raindrops.map(drop => (
          <div
            key={drop.id}
            className="raindrop"
            style={{
              left: drop.left,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`
            }}
          ></div>
        ))}
        
        {/* Snow effect */}
        {weather.condition === 'snowy' && snowflakes.map(flake => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: flake.left,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`
            }}
          ></div>
        ))}
      </div>
            {/* Current Time Display */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        color: timeOfDay === 'night' ? '#fff' : '#333',
        textAlign: 'center',
        zIndex: 100,
            background: 'rgba(255, 255, 255, 0.2)',
    padding: '5px 10px',
    borderRadius: '5px'
  }}>
    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  </div>

  {/* Wall Clock - SVG APPROACH */}
  <div className="wall-clock">
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Clock face */}
      <circle cx="100" cy="100" r="90" fill="white" stroke="#e0e0e0" strokeWidth="2" />
      
      {/* Clock numbers */}
      {[...Array(12)].map((_, i) => {
        const number = i === 0 ? 12 : i;
        const angle = i * 30 * Math.PI / 180;
        const x = 100 + 75 * Math.sin(angle);
        const y = 100 - 75 * Math.cos(angle);
        return (
          <text 
            key={i} 
            x={x} 
            y={y} 
            fontSize="16" 
            textAnchor="middle" 
            dominantBaseline="middle"
            fontWeight="bold"
          >
            {number}
          </text>
        );
      })}
      
      {/* Hour hand */}
      <line 
        x1="100" 
        y1="100" 
        x2={100 + 50 * Math.sin(hourAngle * Math.PI / 180)} 
        y2={100 - 50 * Math.cos(hourAngle * Math.PI / 180)} 
        stroke="#333" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />
      
      {/* Minute hand */}
      <line 
        x1="100" 
        y1="100" 
        x2={100 + 70 * Math.sin(minuteAngle * Math.PI / 180)} 
        y2={100 - 70 * Math.cos(minuteAngle * Math.PI / 180)} 
        stroke="#555" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      
      {/* Second hand */}
      <line 
        x1="100" 
        y1="100" 
        x2={100 + 80 * Math.sin(secondAngle * Math.PI / 180)} 
        y2={100 - 80 * Math.cos(secondAngle * Math.PI / 180)} 
        stroke="#f44336" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      
      {/* Center dot */}
      <circle cx="100" cy="100" r="5" fill="#333" />
    </svg>
  </div>
  
  {/* Water Cooler */}
  <div className="water-cooler" onClick={toggleWaterCooler}>
    <div className="water-cooler-body">
      <div className="water-container">
        <div className="water-level">
          {waterBubbles.map(bubble => (
            <div
              key={bubble.id}
              className="water-bubble"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `${bubble.left}%`,
                animationDelay: `${bubble.delay}s`,
                animationDuration: `${bubble.duration}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="water-spout"></div>
      <div className="water-button-blue"></div>
      <div className="water-button-red"></div>
    </div>
    <div className="water-stand"></div>
    
    <div className={`water-cooler-chat ${showWaterCooler ? 'active' : ''}`}>
      <div>{waterCoolerChat}</div>
      <div className="water-cooler-buttons">
        <button 
          className="water-cooler-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowWaterCooler(false);
          }}
        >
          Walk Away
        </button>
        <button 
          className="water-cooler-btn primary"
          onClick={(e) => {
            e.stopPropagation();
            generateWaterCoolerChat();
            generateBubbles();
          }}
        >
          New Topic
        </button>
      </div>
    </div>
  </div>

  {/* To-Do List Button */}
  <button className="todo-button" onClick={toggleTodoList}>
    📋 To-Do List
  </button>

  {/* To-Do List */}
  <div className={`todo-list ${showTodoList ? 'active' : ''}`}>
    <div className="todo-header">
      <div className="todo-title">Today's Tasks</div>
      <div className="todo-close" onClick={toggleTodoList}>×</div>
    </div>
    
    <form className="todo-form" onSubmit={addTodoItem}>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new task..."
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
      />
      <button type="submit" className="todo-add">+</button>
    </form>
    
    <div className="todo-items">
      {todoItems.map(item => (
        <div key={item.id} className="todo-item">
          <div 
            className={`todo-checkbox ${item.completed ? 'checked' : ''}`}
            onClick={() => toggleTodoCompletion(item.id)}
          >
            {item.completed && '✓'}
          </div>
          <div className={`todo-text ${item.completed ? 'completed' : ''}`}>
            {item.text}
          </div>
          <div 
            className="todo-delete"
            onClick={() => deleteTodoItem(item.id)}
          >
            ×
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Sticky Notes Board */}
  <div className="sticky-board">
    <div className="board-header">Tasks & Reminders</div>
    {notes.map(note => (
      <div 
        key={note.id}
        className={`sticky-note ${activeNote === note.id ? 'active' : ''}`}
        style={{ 
          backgroundColor: note.color,
          transform: `rotate(${note.rotation}deg)`
        }}
        onClick={() => handleNoteClick(note.id)}
      >
        {note.text}
      </div>
    ))}
  </div>
  
  {/* Paper Airplane Messages */}
  <div className="paper-airplane-button" onClick={toggleMessageBox}>
    Send message
  </div>
  
  {showMessageBox && (
    <div className="message-box">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="message-input"
      />
      <button className="send-button" onClick={handleSendMessage}>Send ✈️</button>
    </div>
  )}
  
  {paperAirplanes.map(plane => (
    <div 
      key={plane.id} 
      className={`paper-airplane path-${plane.path}`}
      style={{
        left: `${plane.startX}px`,
        top: `${plane.startY}px`
      }}
    >
      <div className="airplane-body">
        <div className="message-tooltip">{plane.message}</div>
      </div>
    </div>
  ))}

  <div className="desk">
    <div className="desk-surface"></div>
    <div className="desk-leg left"></div>
    <div className="desk-leg right"></div>
    
    {/* Office Pet - Positioned under the desk */}
    {showPet && (
      <div 
        className={`office-pet pet-${petType} pet-${petAction} ${petPosition.x > 500 ? 'from-right' : ''}`}
        style={{
          left: petPosition.x,
          bottom: petPosition.y,
          zIndex: 15 // Ensure it appears under the desk surface but above the legs
        }}
      >
        <div className="pet-body">
          {petType === 'cat' ? '🐱' : '🐶'}
        </div>
        <div className="pet-thought">
          {petAction === 'look' && '❓'}
          {petAction === 'play' && '🎾'}
          {petAction === 'sleep' && '💤'}
        </div>
      </div>
    )}
    
    {/* Coffee mug - updated to only steam on hover */}
    <div className="coffee-mug" onClick={handleCoffeeMugClick}>
      <div className="mug-body"></div>
      <div className="mug-handle"></div>
      <div className="mug-steam steam-1"></div>
      <div className="mug-steam steam-2"></div>
      <div className="mug-steam steam-3"></div>
      <div className="mug-steam steam-4"></div>
      <div className="mug-steam steam-5"></div>
    </div>
    
    {/* Computer Monitor */}
    <div className="computer" onClick={toggleScreen}>
      <div className="monitor">
        <div className={`screen ${isScreenOn ? 'screen-on' : 'screen-off'}`}>
          {isScreenOn && (
            <div className="screen-content">
              {showMeeting ? (
                <div className="screen-meeting">
                  <div className="meeting-header">
                    <div className="meeting-title">Team Standup</div>
                    <div className="meeting-close" onClick={() => setShowMeeting(false)}>×</div>
                  </div>
                  <div className="meeting-grid">
                    {meetingParticipants.map(participant => (
                      <div 
                        key={participant.id} 
                        className={`participant ${participant.status}`}
                      >
                        <div className="participant-avatar">{participant.avatar}</div>
                        <div className="participant-name">{participant.name}</div>
                        {participant.status === 'muted' && <div className="status-icon">🔇</div>}
                        {participant.status === 'camera-off' && <div className="status-icon">🎭</div>}
                        {participant.status === 'speaking' && (
                          <div className="speaking-indicator">
                            <div className="speaking-bar"></div>
                            <div className="speaking-bar"></div>
                            <div className="speaking-bar"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="meeting-controls-small">
                    <div className="control-btn-small mic">🎤</div>
                    <div className="control-btn-small video">📹</div>
                    <div className="control-btn-small end-call" onClick={() => setShowMeeting(false)}>📴</div>
                  </div>
                </div>
              ) : showCall ? (
                <div className="screen-call">
                  <div className="call-header">
                    <div className="call-title">Calling John...</div>
                    <div className="call-close" onClick={() => setShowCall(false)}>×</div>
                  </div>
                  <div className="call-content">
                    <div className="caller-avatar">👨‍💼</div>
                    <div className="caller-name">John</div>
                    <div className="call-status">Ringing...</div>
                  </div>
                  <div className="call-controls">
                    <div className="control-btn mic">🎤</div>
                    <div className="control-btn video">📹</div>
                    <div className="control-btn end-call" onClick={() => setShowCall(false)}>📴</div>
                  </div>
                </div>
              ) : showCssChallenge ? (
                <div className="screen-challenge">
                  <div className="challenge-header">
                    <div className="challenge-logo">DEV</div>
                    <div className="challenge-title">Frontend Challenge: Office Edition</div>
                    <div className="challenge-close" onClick={() => setShowCssChallenge(false)}>×</div>
                  </div>
                  <div className="challenge-content">
                    <div className="challenge-banner">
                      <div className="challenge-banner-bg">
                        <div className="plants">
                          <div className="plant plant-1"></div>
                          <div className="plant plant-2"></div>
                          <div className="plant plant-3"></div>
                          <div className="arrow arrow-1"></div>
                          <div className="arrow arrow-2"></div>
                          <div className="arrow arrow-3"></div>
                        </div>
                        <div className="challenge-info">
                          <div className="challenge-box">
                            <h2 className="challenge-heading">Frontend Challenge: Office Edition</h2>
                            <div className="challenge-prize">USD 3,000 IN PRIZES!</div>
                            <div className="challenge-date">JULY 2 - 27</div>
                            <div className="challenge-sponsor">
                              <div className="sponsor-logo">axero</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="challenge-section">
                      <h2>Challenge ends soon!</h2>
                      <div className="countdown">
                        <div className="countdown-item">
                          <div className="countdown-number">01</div>
                          <div className="countdown-label">DAYS</div>
                        </div>
                        <div className="countdown-separator">:</div>
                        <div className="countdown-item">
                          <div className="countdown-number">22</div>
                          <div className="countdown-label">HOURS</div>
                        </div>
                        <div className="countdown-separator">:</div>
                        <div className="countdown-item">
                          <div className="countdown-number">16</div>
                          <div className="countdown-label">MINUTES</div>
                        </div>
                        <div className="countdown-separator">:</div>
                        <div className="countdown-item">
                          <div className="countdown-number">20</div>
                          <div className="countdown-label">SECONDS</div>
                        </div>
                      </div>
                      <div className="challenge-cta">
                        <button className="challenge-button">See prompts</button>
                      </div>
                    </div>
                    
                    <div className="challenge-section main-content">
                      <h1>Frontend Challenge: Office Edition</h1>
                      <div className="action-buttons">
                        <button className="sign-up-button">Sign up</button>
                        <a className="view-entries">View Entries →</a>
                      </div>
                      <p className="challenge-tagline">Flex your HTML, CSS, and JavaScript skills!</p>
                      
                      <div className="challenge-card">
                        <h3>CSS Art: Office Culture</h3>
                        <p>Draw what comes to mind for you when it comes to office culture. Whether that's classic water cooler conversations, your coworker's mechanical keyboard, ice breaker activities, or The Office™ - we want to see your interpretation of office life through CSS art.</p>
                        <a className="template-link">Submission Template →</a>
                        
                        <div className="judging-criteria">
                          <h4>Judging Criteria:</h4>
                          <ul>
                            <li>• Creativity</li>
                            <li>• Effective Use of CSS</li>
                            <li>• Aesthetic Outcome</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="screen-image"></div>
                  <div className="taskbar"></div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="monitor-stand"></div>
      <div className="monitor-base"></div>
      <div className="keyboard">
        <div className="keyboard-keys"></div>
      </div>
      <div className="mouse"></div>
    </div>
    
    {/* Desk Plant */}
    <div className="plant-container" onClick={waterPlant}>
      <div className="plant-pot">
        <div className="plant-soil"></div>
      </div>
      <div className={`plant growth-${plantGrowth}`}>
        {plantGrowth > 0 && (
          <>
            <div className="plant-stem"></div>
            <div className="plant-leaf left"></div>
            <div className="plant-leaf right"></div>
          </>
        )}
        {plantGrowth > 1 && (
          <>
            <div className="plant-stem-2"></div>
            <div className="plant-leaf left-2"></div>
            <div className="plant-leaf right-2"></div>
          </>
        )}
        {plantGrowth > 2 && (
          <div className="plant-flower"></div>
        )}
      </div>
      {plantGrowth < 3 && (
        <div className="water-me-sign">Water me!</div>
      )}
    </div>
  </div>
  
  {/* Coffee Break Overlay */}
  <div className={`coffee-break-overlay ${coffeeBreak ? 'coffee-break-active' : ''}`}>
    <div className="coffee-break-title">Taking a Coffee Break</div>
    <div className="coffee-break-timer">
      {Math.floor(breakTimeLeft / 60)}:{(breakTimeLeft % 60).toString().padStart(2, '0')}
    </div>
    <div className="coffee-cup-large">
      <div className="coffee-cup-body">
        <div 
          className="coffee-liquid" 
          style={{ height: `${coffeeLevel}%` }}
        ></div>
      </div>
      <div className="coffee-cup-handle"></div>
      <div className="coffee-cup-steam coffee-steam-1"></div>
      <div className="coffee-cup-steam coffee-steam-2"></div>
      <div className="coffee-cup-steam coffee-steam-3"></div>
    </div>
    <button className="end-break-button" onClick={endCoffeeBreak}>
      End Break Early
    </button>
  </div>

  {/* Notifications */}
  <div className="notifications-container">
    {notifications.map(notification => (
      <div 
        key={notification.id} 
        className={`notification ${notification.type}`}
        onClick={() => removeNotification(notification.id)}
      >
        <div className="notification-icon">
          {notification.type === 'email' && '✉️'}
          {notification.type === 'calendar' && '📅'}
          {notification.type === 'reminder' && '⏰'}
          {notification.type === 'comment' && '💬'}
          {notification.type === 'system' && '🔄'}
          {notification.type === 'deadline' && '⚠️'}
        </div>
        <div className="notification-content">
          <div className="notification-title">
            {notification.type === 'email' && 'New Email'}
            {notification.type === 'calendar' && 'Calendar'}
            {notification.type === 'reminder' && 'Reminder'}
            {notification.type === 'comment' && 'Comment'}
            {notification.type === 'system' && 'System'}
            {notification.type === 'deadline' && 'Deadline Alert'}
          </div>
          <div className="notification-message">{notification.message}</div>
        </div>
        <div className="notification-close">×</div>
      </div>
    ))}
  </div>

  {/* Test notification button - remove in production */}
  <button 
    style={{ 
      position: 'absolute', 
      bottom: '10px', 
      right: '10px', 
      zIndex: 1000,
      padding: '5px 10px',
      background: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
    onClick={() => addNotification("This is a test notification", "email")}
  >
    Test Notification
  </button>

  {/* Customize button */}
  <button className="customize-button" onClick={toggleCustomizePanel}>
    🎨 Customize Desk
  </button>

  {/* Customize panel - Updated to include dustbin */}
  <div 
    className={`customize-panel ${showCustomizePanel ? 'active' : ''}`}
    ref={customizePanelRef}
  >
    <div className="panel-close" onClick={toggleCustomizePanel}>×</div>
    <div className="customize-section">
      <div className="customize-section-title">Add Items</div>
      <div className="item-options">
        <div className="item-option" onClick={() => addPersonalItem('photo')}>
          🖼️
        </div>
        <div className="item-option" onClick={() => addPersonalItem('phone')}>
          📱
        </div>
        <div className="item-option" onClick={() => addPersonalItem('water')}>
          🍶
        </div>
        <div className="item-option" onClick={() => addPersonalItem('dustbin')}>
          🗑️
        </div>
      </div>
    </div>
  </div>

  {/* Weather Widget */}
  <div className="weather-widget">
    <div className="weather-header">
      <div className="weather-location">{weather.location}</div>
      <div className="weather-refresh" onClick={changeWeather}>↻</div>
    </div>
    <div className="weather-content">
      <div className="weather-info">
        <div className="weather-temperature">{weather.temperature}°F</div>
        <div className="weather-condition">
          {weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)}
        </div>
      </div>
      <div className="weather-icon">
        {weather.condition === 'sunny' && '☀️'}
        {weather.condition === 'cloudy' && '☁️'}
        {weather.condition === 'rainy' && '🌧️'}
        {weather.condition === 'snowy' && '❄️'}
      </div>
    </div>
  </div>

  {/* Personal items on desk - Updated to include dustbin rendering */}
  {personalItems.map(item => (
    <div
      key={item.id}
      className="personal-item"
      style={{
        left: item.position.x,
        top: item.position.y,
        transform: `rotate(${item.rotation}deg)`,
        zIndex: item.zIndex
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        startDragging(item.id);
      }}
    >
      <div className="item-delete" onClick={() => removePersonalItem(item.id)}>×</div>
      
      {item.type === 'photo' && (
        <div className="photo-frame">
          <div className="photo-inner"></div>
          <div className="photo-stand"></div>
        </div>
      )}
      
      {item.type === 'phone' && (
        <div className="desk-phone">
          <div className="phone-screen"></div>
          <div className="phone-button"></div>
        </div>
      )}
      
      {item.type === 'water' && (
        <div className="water-bottle">
          <div className="bottle-cap"></div>
          <div className="bottle-body"></div>
          <div className="bottle-water"></div>
        </div>
      )}
      
      {item.type === 'dustbin' && (
        <div className="desk-dustbin">
          <div className="dustbin-body"></div>
          <div className="dustbin-lid"></div>
          <div className="dustbin-contents"></div>
        </div>
      )}
    </div>
  ))}
</div>
);
};

export default OfficeScene;