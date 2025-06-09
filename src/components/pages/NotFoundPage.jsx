import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto p-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-6"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
            <ApperIcon name="Search" size={40} className="text-white" />
          </div>
        </motion.div>

        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          Looks like this page doesn't exist in our guide. Let's get you back on track!
        </p>

        <div className="space-y-4">
          <Button onClick={() => navigate('/home')} variant="primary" icon={ApperIcon} iconProps={{ name: 'Home', size: 16 }}>
            Go Home
          </Button>

          <Button onClick={() => navigate(-1)} variant="secondary" icon={ApperIcon} iconProps={{ name: 'ArrowLeft', size: 16 }}>
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;