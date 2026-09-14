import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AnimatedDropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  description?: string;
  badge?: string;
  separator?: boolean;
}

interface AnimatedDropdownProps {
  trigger: React.ReactNode;
  items: AnimatedDropdownItem[];
  className?: string;
  contentClassName?: string;
  align?: 'start' | 'center' | 'end';
  isActive?: boolean;
}

export const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
  trigger,
  items,
  className = '',
  contentClassName = '',
  align = 'start',
  isActive = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -5,
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const getAlignmentClass = () => {
    switch (align) {
      case 'center':
        return 'left-1/2 transform -translate-x-1/2';
      case 'end':
        return 'right-0';
      default:
        return 'left-0';
    }
  };

  const handleItemClick = (item: AnimatedDropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <motion.button
        className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50/70 transition-all duration-200 outline-none ${
          isActive || isOpen ? 'text-emerald-700 font-semibold bg-emerald-50 shadow-sm' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {trigger}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5 opacity-70" />
        </motion.div>
      </motion.button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute top-full mt-2 ${getAlignmentClass()} z-50`}
            onMouseLeave={() => setIsOpen(false)}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {/* 3D Background with glassmorphism effect */}
            <motion.div
              className={`bg-white/95 backdrop-blur-xl border border-emerald-100/50 rounded-2xl shadow-2xl shadow-emerald-900/10 p-2 min-w-[280px] ${contentClassName}`}
              style={{
                boxShadow: `
                  0 20px 25px -5px rgba(0, 0, 0, 0.1),
                  0 10px 10px -5px rgba(0, 0, 0, 0.04),
                  0 0 0 1px rgba(16, 185, 129, 0.05),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-green-100/20 rounded-2xl"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(5, 150, 105, 0.02) 100%)',
                    'linear-gradient(135deg, rgba(5, 150, 105, 0.05) 0%, rgba(16, 185, 129, 0.03) 100%)',
                    'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(5, 150, 105, 0.02) 100%)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Menu Items */}
              <div className="relative z-10">
                {items.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.separator && (
                      <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent my-2"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.03 + 0.1, duration: 0.3 }}
                      />
                    )}
                    
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      className="relative"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Hover background effect */}
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Menu Item */}
                      {item.href ? (
                        <a
                          href={item.href}
                          className="relative z-10 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-emerald-800 transition-colors cursor-pointer group"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon && (
                            <motion.div
                              className="text-emerald-600 group-hover:text-emerald-700"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.15 }}
                            >
                              {item.icon}
                            </motion.div>
                          )}
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="group-hover:translate-x-0.5 transition-transform">
                                {item.label}
                              </span>
                              {item.badge && (
                                <motion.span
                                  className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {item.badge}
                                </motion.span>
                              )}
                            </div>
                            {item.description && (
                              <div className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-600">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </a>
                      ) : (
                        <button
                          onClick={() => handleItemClick(item)}
                          className="relative z-10 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-emerald-800 transition-colors group"
                        >
                          {item.icon && (
                            <motion.div
                              className="text-emerald-600 group-hover:text-emerald-700"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.15 }}
                            >
                              {item.icon}
                            </motion.div>
                          )}
                          
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="group-hover:translate-x-0.5 transition-transform">
                                {item.label}
                              </span>
                              {item.badge && (
                                <motion.span
                                  className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {item.badge}
                                </motion.span>
                              )}
                            </div>
                            {item.description && (
                              <div className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-600">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </button>
                      )}
                    </motion.div>
                  </React.Fragment>
                ))}
              </div>

              {/* Bottom glow effect */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scaleX: [0.8, 1, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};