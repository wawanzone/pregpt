// Modal
document.querySelectorAll(".openModal").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById(button.dataset.target).removeAttribute("data-hidden");
    });
});
document.querySelectorAll(".closeModal").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById(button.dataset.target).setAttribute("data-hidden", "true");
    });
});

// Dropdown
document.querySelectorAll(".toggleDropdown").forEach(button => {
    button.addEventListener("click", () => {
        let dropdown = document.getElementById(button.dataset.target);
        let isOpen = !dropdown.hasAttribute("data-hidden");
        document.querySelectorAll("#hs-dropdown-menu").forEach(d => d.setAttribute("data-hidden", "true"));
        if (!isOpen) {
            dropdown.removeAttribute("data-hidden");
        }
    });
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".hs-dropdown")) {
        document.querySelectorAll("#hs-dropdown-menu").forEach(dropdown => {
            dropdown.setAttribute("data-hidden", "true");
        });
    }
});

// Collapse
document.querySelectorAll("[data-hs-collapse]").forEach(button => {
    button.addEventListener("click", () => {
        let targetSelector = button.getAttribute("data-hs-collapse");
        let target = document.querySelector(targetSelector);

        if (target) {
            let isExpanded = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", !isExpanded);
            target.classList.toggle("hidden");
        }
    });
});

document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active", "text-blue-600", "border-blue-600"));
        document.querySelectorAll(".tab-content").forEach(content => content.classList.add("hidden"));

        button.classList.add("active", "text-blue-600", "border-blue-600");
        let target = document.getElementById(button.dataset.target);
        if (target) {
            target.classList.remove("hidden");
        }
    });
});


// Accordion
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".hs-accordion-toggle").forEach((button) => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Mencegah event bubbling ke parent
            
            const contentId = this.getAttribute("aria-controls");
            const content = document.getElementById(contentId);

            if (!content) {
                console.error(`Accordion content not found: #${contentId}`);
                return;
            }

            const isExpanded = this.getAttribute("aria-expanded") === "true";
            const parentAccordion = this.closest(".hs-accordion-group");

            // Tutup hanya accordion yang berada dalam parent yang sama
            parentAccordion.querySelectorAll(".hs-accordion-content").forEach((panel) => {
                if (panel !== content) {
                    panel.classList.add("hidden");
                    panel.previousElementSibling.setAttribute("aria-expanded", "false");
                }
            });

            // Toggle accordion yang diklik
            if (!isExpanded) {
                content.classList.remove("hidden");
                content.style.height = "auto";
                this.setAttribute("aria-expanded", "true");
            } else {
                content.style.height = "0px";
                this.setAttribute("aria-expanded", "false");
                setTimeout(() => content.classList.add("hidden"), 300);
            }
        });
    });
});




// Tooltips
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tooltip-btn");

    buttons.forEach(button => {
        const tooltip = button.nextElementSibling;

        button.addEventListener("click", (event) => {
            event.stopPropagation(); // Mencegah event dari bubbling ke document
            const isOpen = tooltip.classList.contains("tooltip-show");

            // Tutup semua tooltip lain dulu
            document.querySelectorAll(".tooltip-content").forEach(t => {
                if (t !== tooltip) {
                    t.classList.remove("tooltip-show");
                }
            });

            // Toggle tooltip
            tooltip.classList.toggle("tooltip-show", !isOpen);
        });

        // Mencegah klik di dalam tooltip menutupnya
        tooltip.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });

    // Sembunyikan tooltip saat klik di luar
    document.addEventListener("click", () => {
        document.querySelectorAll(".tooltip-content").forEach(t => t.classList.remove("tooltip-show"));
    });
});

// Close Announcement Banner
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-hs-remove-element]").forEach(button => {
        button.addEventListener("click", function () {
            const targetSelector = button.getAttribute("data-hs-remove-element");
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                targetElement.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";
                targetElement.style.opacity = "0";

                setTimeout(() => {
                    targetElement.remove();
                }, 100); // Waktu transisi sebelum elemen dihapus dari DOM
            }
        });
    });
});
