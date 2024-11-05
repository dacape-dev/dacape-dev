// Aceptar todas las cookies
function acceptCookies() {
    document.getElementById("cookieBanner").style.display = "none";
    // Almacenar el consentimiento en localStorage o cookies
    localStorage.setItem("cookiesAccepted", "true");
    localStorage.setItem("cookiesPreferences", JSON.stringify({
        analytics: true,
        advertising: true
    }));
}

// Mostrar preferencias de cookies
function showCookiePreferences() {
    var myModal = new bootstrap.Modal(document.getElementById('cookiePreferences'));
    myModal.show();
}

// Guardar las preferencias del usuario
function savePreferences() {
    const analytics = document.getElementById("analyticsCookies").checked;
    const advertising = document.getElementById("advertisingCookies").checked;
    // Almacenar las preferencias en localStorage o cookies
    localStorage.setItem("cookiesPreferences", JSON.stringify({
        analytics,
        advertising
    }));
    // Ocultar el modal
    var myModal = bootstrap.Modal.getInstance(document.getElementById('cookiePreferences'));
    myModal.hide();
    document.getElementById("cookieBanner").style.display = "none";
}


// Comprobar si ya se ha aceptado el consentimiento
window.onload = function() {
    if (localStorage.getItem("cookiesAccepted") === "true") {
        document.getElementById("cookieBanner").style.display = "none";
    }
};
