// Note: About page
import profileImage from '../assets/profile.jpg';
import BackButton from './backButton';
import logo from '../assets/logo.svg';

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <div className="flex justify-center items-center bg-gray-300">
        <img src={logo} alt="" className="w-20 h-20" />
      </div>
      <BackButton />
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-3">
            <div className="relative mt-4">
              <div className="w-32 h-32 mx-auto overflow-hidden rounded-full mb-8 m">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full mx-auto"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">About Me</h2>
              <p className="text-md text-gray-700 dark:text-gray-400">
                Hey there! My name is Hugh Avery, and I am a passionate and driven computer science student with a strong
                enthusiasm for technology and innovation. I am currently pursuing a Bachelor of Science majoring in Computer 
                Science at the University of Canterbury. My goal is to secure an exciting role as a full-stack developer where 
                I can apply my knowledge and skills in a professional setting. 
              </p>
              <div className="font-bold text-xl mt-2">Hobbies</div>
              <ul className="list-disc pl-6 mb-4">
                <li>🏃<a href="https://www.strava.com/athletes/38581591" target='_blank' className='underline hover:text-blue-400'>Running</a></li>
                <li>🎾 Tennis</li>
                <li>🥾 Tramping</li>
                <li>🏄‍♂️ Surfing</li>
                <li>🎻 Violin</li>
                <li>🚵‍♂️ Mountain Biking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
