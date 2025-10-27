import { JSX, createSignal, onMount, onCleanup } from "solid-js";
import { Button } from "../components/Button";
import { NotificationPopup } from "../components/NotificationPopup";
import { handleFormUtils } from "../utils/formUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact(): JSX.Element {
  const [showPopup, setShowPopup] = createSignal(false);
  const [notification, setNotification] = createSignal<string>("");
  const [isFormInvalid, setIsFormInvalid] = createSignal(false);
  const [isHovered, setIsHovered] = createSignal(-1);

  let contactRef: HTMLElement | undefined;
  let formRef: HTMLFormElement | undefined;
  let contactInfoRef: HTMLDivElement | undefined;
  let titleRef: HTMLHeadingElement | undefined;
  let subtitleRef: HTMLParagraphElement | undefined;

  const handleSubmitForm = (event: Event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    if (!email.includes("@")) {
      setNotification("Email harus mengandung '@'.");
      setShowPopup(true);
      setIsFormInvalid(true);
      return;
    }

    if (!name || !email || !message) {
      setNotification("Semua field harus diisi.");
      setShowPopup(true);
      setIsFormInvalid(true);
      return;
    }

    setIsFormInvalid(false);
    handleFormUtils(event, setNotification, setShowPopup);
  };

  onMount(() => {
    // GSAP Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate title and subtitle
    if (titleRef && subtitleRef) {
      tl.from(titleRef, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out"
      })
      .from(subtitleRef, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");
    }

    // Animate form
    if (formRef) {
      tl.from(formRef, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out"
      }, "-=0.3");
    }

    // Animate contact info (simplified)
    if (contactInfoRef) {
      tl.from(contactInfoRef, {
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    }

    // Animate contact info items (simplified)
    setTimeout(() => {
      const contactItems = document.querySelectorAll('.contact-item');
      contactItems.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out"
        });
      });
    }, 100);

    // Form input animations
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
      gsap.set(input, { transformOrigin: "left center" });
      
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          boxShadow: "0 0 0 4px rgba(126, 116, 241, 0.15)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          boxShadow: "0 0 0 0px rgba(126, 116, 241, 0)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Contact card hover animations (enhanced)
    const contactCards = document.querySelectorAll('.contact-item');
    contactCards.forEach((card, index) => {
      const icon = card.querySelector('.contact-icon');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -12,
          scale: 1.03,
          duration: 0.5,
          ease: "power3.out"
        });
        
        if (icon) {
          gsap.to(icon, {
            rotation: 8,
            scale: 1.15,
            duration: 0.5,
            ease: "back.out(1.2)"
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out"
        });
        
        if (icon) {
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out"
          });
        }
      });
    });

    onCleanup(() => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
  });

  return (
    <section 
      id="contact" 
      ref={contactRef}
      class="min-h-screen flex items-center justify-center py-20 relative"
    >
      {/* Background gradient */}
      <div class="absolute inset-0 bg-gradient-to-br from-backgroundColors-secondary via-backgroundColors-primary to-backgroundColors-third"></div>
      
      {/* Animated background elements */}
      <div class="absolute top-20 left-10 w-72 h-72 bg-iconColors-primary opacity-10 rounded-full blur-3xl floating-animation"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-iconColors-hover opacity-10 rounded-full blur-3xl floating-animation-delayed"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-iconColors-primary to-iconColors-hover opacity-5 rounded-full blur-3xl floating-animation"></div>
      
      {/* Grid pattern overlay */}
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(126, 116, 241, 0.3) 1px, transparent 0); background-size: 50px 50px;"></div>
      </div>
      
      <div class="container mx-auto px-4 lg:px-7 relative z-10 w-full">
        {/* Header Section */}
        <div class="text-center mb-12 lg:mb-16">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-iconColors-primary to-iconColors-hover rounded-2xl shadow-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="fill-current text-white">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <h2 
            ref={titleRef}
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-textColors-primary mb-6 tracking-tight"
          >
            Let's <span class="bg-gradient-to-r from-iconColors-primary to-iconColors-hover bg-clip-text text-transparent">Connect</span>
          </h2>
          <p 
            ref={subtitleRef}
            class="text-lg md:text-xl text-textColors-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Form Section */}
          <div class="w-full">
            <div class="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/20">
              <div class="mb-8">
                <h3 class="text-2xl font-bold text-textColors-primary mb-3">Send Message</h3>
                <p class="text-textColors-secondary">Fill out the form below and I'll get back to you as soon as possible.</p>
              </div>
              <form
                ref={formRef}
                action="https://formspree.io/f/xqazkojo"
                method="post"
                class="space-y-6"
                onSubmit={handleSubmitForm}
              >
                <div class="space-y-6">
                  <div class="relative group">
                    <input
                      type="text"
                      placeholder=" "
                      name="name"
                      required
                      class="form-input w-full p-4 bg-transparent border-2 border-gray-200 rounded-xl placeholder-transparent focus:outline-none focus:border-iconColors-primary transition-all duration-300 peer"
                    />
                    <label class="absolute left-4 -top-3 bg-white px-2 text-textColors-secondary text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-iconColors-primary peer-focus:font-medium">
                      Full Name
                    </label>
                  </div>

                  <div class="relative group">
                    <input
                      type="email"
                      placeholder=" "
                      name="email"
                      required
                      class="form-input w-full p-4 bg-transparent border-2 border-gray-200 rounded-xl placeholder-transparent focus:outline-none focus:border-iconColors-primary transition-all duration-300 peer"
                    />
                    <label class="absolute left-4 -top-3 bg-white px-2 text-textColors-secondary text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-iconColors-primary peer-focus:font-medium">
                      Email Address
                    </label>
                  </div>

                  <div class="relative group">
                    <textarea
                      name="message"
                      placeholder=" "
                      rows="5"
                      required
                      class="form-input w-full p-4 bg-transparent border-2 border-gray-200 rounded-xl resize-none placeholder-transparent focus:outline-none focus:border-iconColors-primary transition-all duration-300 peer"
                    ></textarea>
                    <label class="absolute left-4 -top-3 bg-white px-2 text-textColors-secondary text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-iconColors-primary peer-focus:font-medium">
                      Your Message
                    </label>
                  </div>
                </div>

                <div class="pt-2">
                  <Button type="submit" variant="submit">
                    <span>{isFormInvalid() ? "Form Tidak Boleh Kosong" : "Send Message"}</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info Section */}
          <div ref={contactInfoRef} class="w-full space-y-6">
            {/* Address Card */}
            <div 
              class="contact-item group relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-white/20 overflow-hidden"
              onMouseEnter={() => setIsHovered(0)}
              onMouseLeave={() => setIsHovered(-1)}
            >
              {/* Gradient overlay on hover */}
              <div class="absolute inset-0 bg-gradient-to-br from-iconColors-primary/5 to-iconColors-hover/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="relative z-10 flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="contact-icon w-16 h-16 bg-gradient-to-br from-iconColors-primary to-iconColors-hover rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      class="fill-current text-white"
                    >
                      <path d="M12 1c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" />
                    </svg>
                  </div>
                </div>
                <div class="contact-content flex-grow">
                  <h4 class="font-bold text-xl text-textColors-primary mb-3 group-hover:text-iconColors-primary transition-colors duration-300">
                    Location
                  </h4>
                  <p class="text-textColors-secondary leading-relaxed group-hover:text-textColors-primary/80 transition-colors duration-300">
                    Sleman, DI Yogyakarta<br />
                    <span class="inline-flex items-center mt-1">
                      Indonesia <span class="ml-1">🇮🇩</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div 
              class="contact-item group relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-white/20 overflow-hidden"
              onMouseEnter={() => setIsHovered(1)}
              onMouseLeave={() => setIsHovered(-1)}
            >
              {/* Gradient overlay on hover */}
              <div class="absolute inset-0 bg-gradient-to-br from-iconColors-primary/5 to-iconColors-hover/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="relative z-10 flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="contact-icon w-16 h-16 bg-gradient-to-br from-iconColors-primary to-iconColors-hover rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      class="fill-current text-white"
                    >
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                    </svg>
                  </div>
                </div>
                <div class="contact-content flex-grow">
                  <h4 class="font-bold text-xl text-textColors-primary mb-3 group-hover:text-iconColors-primary transition-colors duration-300">
                    Email
                  </h4>
                  <p class="text-textColors-secondary leading-relaxed break-all group-hover:text-textColors-primary/80 transition-colors duration-300">
                    ardiantoramadhan83@gmail.com
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Pop-up Notifikasi */}
        {showPopup() && (
          <NotificationPopup
            notification={notification()}
            closePopup={() => setShowPopup(false)}
          />
        )}
      </div>
    </section>
  );
}
