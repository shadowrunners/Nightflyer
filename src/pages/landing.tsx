import { styles } from "../utils/utils";
import {
  Developers,
  Features,
  Footer,
  Hero,
  MoreFeatures,
  Navbar,
  Stats,
} from "../components/layout/main/index";
import React from "react";

const MainPage = () => (
  <div className="bg-black w-full overflow-hidden font-poppins font-semibold">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxNav}`}>
        <Navbar />
      </div>
    </div>
    <div className={`${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    <div className={`bg-black ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats /> <Features /> <MoreFeatures /> <Developers />
        <Footer />
      </div>
    </div>
  </div>
);

export default MainPage;