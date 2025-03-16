import { cn } from "@/lib/utils";
import {
  IconAdjustments,
  IconBook,
  IconCertificate,
  IconCurrencyDollar,
  IconDeviceLaptop,
  IconRefresh,
  IconUserCheck,
  IconUsers,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Interactive Learning Experience",
      description:
        "Engage with high-quality video lectures, quizzes, and hands-on projects to enhance your learning journey.",
      icon: <IconBook />,
    },
    {
      title: "Personalized Learning Paths",
      description:
        "Get tailored course recommendations and track your progress with our AI-driven learning assistant.",
      icon: <IconAdjustments />,
    },
    {
      title: "Expert Instructors",
      description:
        "Learn from industry experts and experienced educators who are passionate about teaching.",
      icon: <IconUserCheck />,
    },
    {
      title: "Affordable Pricing",
      description:
        "Access premium courses at an affordable price with flexible payment options.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Certification & Career Support",
      description:
        "Earn globally recognized certificates and get career guidance to land your dream job.",
      icon: <IconCertificate />,
    },
    {
      title: "24/7 Community Support",
      description:
        "Join a vibrant learning community and get instant support from peers and mentors.",
      icon: <IconUsers />,
    },
    {
      title: "Multi-Device Learning",
      description:
        "Learn anytime, anywhere on your laptop, tablet, or smartphone.",
      icon: <IconDeviceLaptop />,
    },
    {
      title: "Regular Updates & New Content",
      description:
        "Stay up-to-date with the latest industry trends and new course materials added regularly.",
      icon: <IconRefresh />,
    },
  ];

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-4 sm:mx-6 md:mx-8 lg:mx-20 md:m-auto  max-h-[100vh] overflow-auto ">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800 ",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-40 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-40 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-white dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-400 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
