import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CustomCarousel.module.scss";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";

export function CarouselContainer({ children }: { children: React.ReactNode }) {
  const scrollContainer = useRef<HTMLUListElement>(null);
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showRightNav, setShowRightNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainer.current;
      if (container) {
        // Check if there are items to scroll to the left
        setShowLeftNav(container.scrollLeft > 0);

        // Check if there are items to scroll to the right
        setShowRightNav(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    const container = scrollContainer.current;
    if (container) {
      // Initial check for navigation buttons visibility
      setShowLeftNav(container.scrollLeft > 0);
      setShowRightNav(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );

      // Add scroll event listener
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      // Cleanup: Remove scroll event listener
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // scroll left
  function scrollLeft() {
    scrollContainer?.current?.scrollBy({
      left: -window.innerWidth,
      behavior: "smooth",
    });
  }
  // scroll right
  function scrollRight() {
    scrollContainer?.current?.scrollBy({
      left: window.innerWidth,
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.carouselContainer}>
      <ul className={styles.carousel} ref={scrollContainer}>
        {children}
      </ul>
      <div className={styles.navBtnContainer}>
        {showLeftNav && (
          <button
            className={`${styles.nav_btn} ${styles["nav_btn--left"]}`}
            onClick={scrollLeft}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className={styles.sr_only}>Scroll left</span>
          </button>
        )}
        {showRightNav && (
          <button
            className={`${styles.nav_btn} ${styles["nav_btn--right"]}`}
            onClick={scrollRight}
          >
            <FontAwesomeIcon icon={faChevronRight} />
            <span className={styles.sr_only}>Scroll right</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function CarouselItem({ children }: { children: React.ReactNode }) {
  return <li className={styles.item}>{children}</li>;
}
