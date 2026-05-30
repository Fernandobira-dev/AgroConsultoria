// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const scrollTop = document.getElementById("scrollTop");

  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
    scrollTop.classList.add("visible");
  } else {
    navbar.classList.remove("scrolled");
    scrollTop.classList.remove("visible");
  }
});

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".pricing-card, .benefit-card, .value-item, .stat-item"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent =
        target + (element.textContent.includes("+") ? "+" : "%");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(current) +
        (element.textContent.includes("+") ? "+" : "%");
    }
  }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.textContent);
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Add hover effect to pricing cards
document.querySelectorAll(".pricing-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
  });
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Mobile menu toggle (for future implementation)
const createMobileMenu = () => {
  const nav = document.querySelector("nav ul");
  if (window.innerWidth <= 768 && nav) {
    nav.style.display = "none";
    // Add hamburger menu functionality here
  }
};

window.addEventListener("resize", createMobileMenu);
createMobileMenu();

// Add loading effect
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const hero = document.querySelector(".hero");
  const scrolled = window.pageYOffset;
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add ripple effect to buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.6)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s ease-out";
    ripple.style.pointerEvents = "none";

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
      @keyframes ripple {
          to {
              transform: scale(4);
              opacity: 0;
          }
      }
  `;
document.head.appendChild(style);

// Form submission handler
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = bookingForm.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>⏳</span> Enviando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      // Show success message
      const successDiv = document.createElement("div");
      successDiv.className = "form-success show";
      successDiv.innerHTML = `
                  <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                  <h3>Pedido Enviado com Sucesso!</h3>
                  <p>Obrigado pelo seu interesse, ${data.nome}!</p>
                  <p>Entraremos em contacto consigo em breve através do email ou telefone fornecido.</p>
                  <p style="margin-top: 1.5rem; font-size: 0.95rem; opacity: 0.9;">Referência: AGR-${Date.now()
                    .toString()
                    .slice(-6)}</p>
              `;

      bookingForm.style.display = "none";
      bookingForm.parentElement.insertBefore(successDiv, bookingForm);

      // Log data (in production, send to backend)
      console.log("Form submitted:", data);

      // Reset form after delay
      setTimeout(() => {
        bookingForm.reset();
        bookingForm.style.display = "flex";
        successDiv.remove();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 5000);
    }, 1500);
  });
}

// Set minimum date to today for date input
const dateInput = document.getElementById("data");
if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}

// Pricing table filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const tableRows = document.querySelectorAll(".pricing-table tbody tr");
const mobileCards = document.querySelectorAll(".price-card-mobile");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    // Filter table rows
    tableRows.forEach((row) => {
      if (filter === "all" || row.getAttribute("data-type") === filter) {
        row.style.display = "";
        setTimeout(() => (row.style.opacity = "1"), 10);
      } else {
        row.style.opacity = "0";
        setTimeout(() => (row.style.display = "none"), 300);
      }
    });

    // Filter mobile cards
    mobileCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-type") === filter) {
        card.style.display = "block";
        setTimeout(() => (card.style.opacity = "1"), 10);
      } else {
        card.style.opacity = "0";
        setTimeout(() => (card.style.display = "none"), 300);
      }
    });
  });
});

// Sort table functionality
let sortDirection = {};

function sortTable(columnIndex) {
  const table = document.getElementById("pricingTable");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Initialize sort direction for this column
  if (!sortDirection[columnIndex]) {
    sortDirection[columnIndex] = "asc";
  } else {
    sortDirection[columnIndex] =
      sortDirection[columnIndex] === "asc" ? "desc" : "asc";
  }

  rows.sort((a, b) => {
    let aValue = a.cells[columnIndex].textContent.trim();
    let bValue = b.cells[columnIndex].textContent.trim();

    // Handle numeric values
    const aNum = parseFloat(aValue.replace(/[^\d]/g, ""));
    const bNum = parseFloat(bValue.replace(/[^\d]/g, ""));

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return sortDirection[columnIndex] === "asc"
        ? aNum - bNum
        : bNum - aNum;
    }

    // Handle text values
    return sortDirection[columnIndex] === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  // Clear and repopulate tbody
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  rows.forEach((row) => tbody.appendChild(row));

  // Update sort icon
  const headers = table.querySelectorAll("th");
  headers.forEach((header, index) => {
    const icon = header.querySelector(".sort-icon");
    if (icon) {
      icon.textContent =
        index === columnIndex
          ? sortDirection[columnIndex] === "asc"
            ? "↑"
            : "↓"
          : "⇅";
    }
  });
}

// Export table to CSV
function exportTableToCSV() {
  const table = document.getElementById("pricingTable");
  let csv = [];

  // Get headers
  const headers = Array.from(table.querySelectorAll("thead th"))
    .slice(0, -1) // Exclude action column
    .map((th) => th.textContent.replace(/⇅|↑|↓/g, "").trim());
  csv.push(headers.join(","));

  // Get data
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const cols = Array.from(row.cells)
      .slice(0, -1) // Exclude action column
      .map((td) => {
        let text = td.textContent.trim();
        text = text.replace(/⭐ Popular/g, "");
        text = text.replace(/-\d+%/g, "");
        return `"${text}"`;
      });
    csv.push(cols.join(","));
  });

  // Download
  const csvContent = csv.join("\n");
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "agroconsultoria_precos.csv";
  link.click();
}

// Print table
function printTable() {
  const printContent = document
    .querySelector(".pricing-table-wrapper")
    .cloneNode(true);
  const actionBtns = printContent.querySelector(".table-actions");
  if (actionBtns) actionBtns.remove();

  const printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write(
    "<html><head><title>Tabela de Preços - AgroConsultoria</title>"
  );
  printWindow.document.write("<style>");
  printWindow.document.write(`
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #2d5016; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #2d5016; color: white; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .badge { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
          .presencial { background: #e3f2fd; color: #1976d2; }
          .online { background: #f3e5f5; color: #7b1fa2; }
          .hibrido { background: #fff3e0; color: #f57c00; }
      `);
  printWindow.document.write("</style></head><body>");
  printWindow.document.write(
    "<h1>AgroConsultoria - Tabela de Preços</h1>"
  );
  printWindow.document.write(printContent.innerHTML);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}

// Make functions global
window.sortTable = sortTable;
window.exportTableToCSV = exportTableToCSV;
window.printTable = printTable;
