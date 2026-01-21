// --- Utilidades ---
function leerNumero(valor) {
  // Permite comas o puntos como separador decimal
  const normalizado = String(valor || "")
    .replace(",", ".")
    .trim();
  const num = Number(normalizado);
  return Number.isFinite(num) ? num : null;
}

function mostrarAlerta(tipo, mensaje) {
  const alerta = document.getElementById("alerta");
  alerta.className = "alert alert-" + tipo;
  alerta.textContent = mensaje;
  alerta.classList.remove("d-none");
}

function limpiarAlerta() {
  const alerta = document.getElementById("alerta");
  alerta.className = "alert d-none";
  alerta.textContent = "";
}

function imprimirResultados(mayorAMenor, menorAMayor, iguales) {
  document.getElementById("resMayor").textContent = Array.isArray(mayorAMenor)
    ? mayorAMenor.join(", ")
    : "";
  document.getElementById("resMenor").textContent = Array.isArray(menorAMayor)
    ? menorAMayor.join(", ")
    : "";
  document.getElementById("resIguales").textContent = iguales
    ? "Los tres números son iguales."
    : Array.isArray(mayorAMenor)
      ? "No todos son iguales."
      : "";
}

function limpiarCampos() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("num3").value = "";
  document.getElementById("num1").focus();
}

// --- Lógica principal ---
document.addEventListener("DOMContentLoaded", () => {
  const btnCalcular = document.getElementById("btnCalcular");
  const btnLimpiar = document.getElementById("btnLimpiar");

  // Estado inicial
  imprimirResultados(null, null, false);

  btnCalcular.addEventListener("click", () => {
    limpiarAlerta();

    const v1 = leerNumero(document.getElementById("num1").value);
    const v2 = leerNumero(document.getElementById("num2").value);
    const v3 = leerNumero(document.getElementById("num3").value);

    if (v1 === null || v2 === null || v3 === null) {
      mostrarAlerta(
        "warning",
        "Por favor, ingresa solo números válidos (ej. 4, 12, 3.5 o 3,5).",
      );
      imprimirResultados(null, null, false);
      return;
    }

    const iguales = v1 === v2 && v2 === v3;

    if (iguales) {
      mostrarAlerta("info", "Los tres números son iguales.");
    } else {
      mostrarAlerta("success", "Cálculo realizado correctamente.");
    }
>
    const numeros = [v1, v2, v3];
    const mayorAMenor = [...numeros].sort((a, b) => b - a);
    const menorAMayor = [...numeros].sort((a, b) => a - b);

    imprimirResultados(mayorAMenor, menorAMayor, iguales);
  });

  btnLimpiar.addEventListener("click", () => {
    limpiarCampos();
    limpiarAlerta();
    imprimirResultados(null, null, false);
  });
});
