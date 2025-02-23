// pages/index.tsx
// import { auth, currentUser, User } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";
// import UserProfile from "../../components/Profile";

const Page =  () => {

  return (
    <div className="min-h-screen pt-24 pb-12 flex justify-center items-center bg-gray-50">
      {/* <UserProfile
        username="webdev_john"
        fullName="Tayyab & Hamza Ilyas"
        bio="I am a passionate Web Developer who loves to create interactive and engaging websites. With a keen eye for design and functionality, I specialize in building seamless user experiences using the latest front-end technologies. My goal is to develop clean, efficient, and scalable code that enhances usability and performance.

I have expertise in HTML, CSS, JavaScript, TypeScript, React, Next.js, and Tailwind CSS, allowing me to craft modern and responsive applications. Whether it’s designing sleek UI components or optimizing performance, I always strive for excellence. I believe in writing maintainable code and following best practices to deliver high-quality products.


Beyond coding, I am always eager to learn new technologies and stay updated with industry trends. Web development is constantly evolving, and I enjoy keeping up with the latest tools and frameworks to improve my workflow. I also love solving complex problems, debugging issues, and refining my projects for better user experiences.

When I’m not coding, I explore new design inspirations, contribute to open-source projects, and share knowledge with fellow developers. Collaboration and continuous learning are at the heart of my work.

 Check out my portfolio to see my latest projects and innovations!
"
        profileImage="/images/cartoon-developer.png" // Add your cartoon developer image here
      /> */}

<UserProfile />
    </div>
  );
};

export default Page;