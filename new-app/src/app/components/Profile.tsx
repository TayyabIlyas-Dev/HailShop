'use client'
// components/UserProfile.tsx
import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { developer } from '@/public';

interface UserProfileProps {
  username: string;
  fullName: string;
  bio: string;
  profileImage: string;
}

const UserProfile: FC<UserProfileProps> = ({ username, fullName, bio, profileImage }) => {
  return (
    <div className=' h-auto  mt-14  mx-3 '>
    <motion.div 
      className="p-8 bg-gradient-to-r container from-indigo-300 via-purple-400 to-pink-300 shadow-2xl rounded-3xl text-white"
      whileHover={{ scale: 1.00, rotate: 2 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center space-x-6 mb-4">
        <div className="relative sm:w-32 mx-4 h-16 w-24 sm:h-32">
          <Image
            src={developer}
            alt={`${fullName}'s profile`}
            layout="fill"
            className="rounded-[150px] object-cover border-4 border-white shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl  font-semibold">{fullName}</h2>
          <p className="text-sm mx-4 italic text-gray-200">@{username}</p>
        </div>
      </div>
      <p className="sm:text-md mx-4 h-[150px] mb-4 overflow-hidden overflow-y-auto custom-scrollbar2 text-sm py-2">{bio}</p>
      <motion.a
        href="https://yourportfolio.com" // Replace with your actual portfolio link
        className="mt-8 px-4 py-2  mx-4 text-sm hover:bg-pink-200 bg-white hover:text-emerald-600 text-purple-500 rounded-full font-semibold  transition-all duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit my Portfolio
      </motion.a>
    </motion.div>
    </div>
  );
};

export default UserProfile;
