gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    gsap.utils.toArray(".card").forEach((card, index) => {
        // On vérifie si la carte est déjà visible dans la fenêtre au chargement
        const rect = card.getBoundingClientRect();
        const isVisibleAtStart = rect.top < window.innerHeight;

        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            // Si la carte est déjà là, on met un délai (0.2s, 0.4s...)
            // Sinon, pas de délai (0s) pour qu'elle pop dès qu'on scrolle dessus
            delay: isVisibleAtStart ? index * 0.2 : 0,
            
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true,
                // On enlève les onEnter complexes qui créent des bugs
            }
        });
    });
});