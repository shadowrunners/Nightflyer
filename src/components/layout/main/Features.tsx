import { features } from "../../../utils/constants";
import { styles, layout } from "../../../utils/utils";

const FeatureCard = ({ icon, title, content, index }: FeatureCardProps) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
        {content}
      </p>
    </div>
  </div>
);

const Features = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={`${styles.heading2}`}>
        Harness the power of <br className="sm:block" hidden /> extended control
        over your server.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Supercharge your Discord experience to a new level with Evelyn's powerful toolkit, packed with an array of exciting features!
      </p>
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Features;

interface FeatureCardProps {
  icon: string;
  title: string;
  content: string;
  index: number;
}
