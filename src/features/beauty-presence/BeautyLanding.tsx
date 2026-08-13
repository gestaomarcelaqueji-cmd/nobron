"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import type {
  BeautyBookingContext,
  BeautyPageData,
  BeautyService,
  BeautyWork,
} from "./data/beauty.types";
import { createBeautyTheme } from "./theme/createBeautyTheme";
import { createBeautyWhatsappUrl } from "./utils/whatsapp";
import {
  buildGeneralWhatsappMessage,
  buildServiceWhatsappMessage,
  buildWorkWhatsappMessage,
} from "./utils/beautyCopy";

import { AppTopBar } from "./components/AppTopBar/AppTopBar";
import { BottomNavigation } from "./components/BottomNavigation/BottomNavigation";
import { BookingSheet } from "./components/BookingSheet/BookingSheet";
import { DemoInfoSheet } from "./components/DemoInfoSheet/DemoInfoSheet";
import { WorkDetail } from "./components/WorkDetail/WorkDetail";

import { Home } from "./sections/Home/Home";
import { Services } from "./sections/Services/Services";
import { Works } from "./sections/Works/Works";
import { Profile } from "./sections/Profile/Profile";
import { NobronTransition } from "./sections/NobronTransition/NobronTransition";

import styles from "./BeautyLanding.module.css";

type BeautyLandingProps = {
  data: BeautyPageData;
};

export function BeautyLanding({ data }: BeautyLandingProps) {
  const themeStyle = useMemo(() => createBeautyTheme(data.theme), [data.theme]);

  const [activeWork, setActiveWork] = useState<BeautyWork | null>(null);
  const [workFilterRequest, setWorkFilterRequest] = useState<{ serviceId: string; nonce: number } | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<BeautyBookingContext>({});
  const [demoInfoOpen, setDemoInfoOpen] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);

  useEffect(() => {
    const closing = document.getElementById("nobron");
    if (!closing) return;

    const observer = new IntersectionObserver(
      ([entry]) => setClosingVisible(entry.isIntersecting && entry.intersectionRatio > 0.16),
      { threshold: [0, 0.16, 0.3] },
    );

    observer.observe(closing);
    return () => observer.disconnect();
  }, []);

  function openExternal(url: string | null) {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function openBooking(context: BeautyBookingContext = {}) {
    setBookingContext(context);
    setBookingOpen(true);
  }

  function continueBooking(service?: BeautyService, work?: BeautyWork | null) {
    if (data.contact.bookingUrl) {
      openExternal(data.contact.bookingUrl);
      return;
    }

    const message = work
      ? buildWorkWhatsappMessage(data, work)
      : service
        ? buildServiceWhatsappMessage(data, service)
        : buildGeneralWhatsappMessage(data);

    openExternal(createBeautyWhatsappUrl(data.contact.whatsapp ?? "", message));
  }

  function exploreServiceWorks(serviceId: string) {
    setWorkFilterRequest({ serviceId, nonce: Date.now() });
    requestAnimationFrame(() => {
      document.getElementById("trabalhos")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function openWorkBooking(work: BeautyWork) {
    setActiveWork(null);
    setBookingContext({ serviceId: work.serviceId, work });
    setBookingOpen(true);
  }

  const overlayOpen = Boolean(activeWork) || bookingOpen || demoInfoOpen;
  const hideChrome = overlayOpen || closingVisible;

  return (
    <main className={styles.page} style={themeStyle}>
      <AppTopBar
        data={data}
        hidden={hideChrome}
        onOpenDemo={() => setDemoInfoOpen(true)}
      />

      <Home
        data={data}
        onBook={() => openBooking()}
        onOpenWork={setActiveWork}
      />

      <Services
        data={data}
        onExploreWorks={exploreServiceWorks}
        onBookService={(serviceId) => openBooking({ serviceId })}
      />

      <Works
        key={workFilterRequest?.nonce ?? "works"}
        data={data}
        preferredServiceId={workFilterRequest?.serviceId}
        onOpenWork={setActiveWork}
      />

      <Profile data={data} onBook={() => openBooking()} />
      <NobronTransition data={data} />

      <BottomNavigation hidden={hideChrome} onBook={() => openBooking()} />

      <AnimatePresence>
        {activeWork ? (
          <WorkDetail
            key="work-detail"
            work={activeWork}
            works={data.works}
            onClose={() => setActiveWork(null)}
            onNavigate={setActiveWork}
            onBookWork={openWorkBooking}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {bookingOpen ? (
          <BookingSheet
            key="booking-sheet"
            open={bookingOpen}
            data={data}
            serviceId={bookingContext.serviceId}
            work={bookingContext.work}
            onServiceChange={(serviceId) =>
              setBookingContext((current) => ({ ...current, serviceId }))
            }
            onClose={() => setBookingOpen(false)}
            onContinue={continueBooking}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {demoInfoOpen ? (
          <DemoInfoSheet
            key="demo-info"
            open={demoInfoOpen}
            data={data}
            onClose={() => setDemoInfoOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
