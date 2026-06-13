import os, time

# ─── CLI (standalone) ────────────────────────────────────────────────────────

def evaluar_riesgo_cli():
    os.system("cls" if os.name == "nt" else "clear")
    puntos = 0
    VERDE   = "\033[92m"
    AMARILLO = "\033[93m"
    ROJO    = "\033[91m"
    RESET   = "\033[0m"

    usuario = input("Ingrese su nombre: ")

    while True:
        try:
            dolor_num = int(input("Ingrese del 1 al 10 que tan intenso es el dolor que presenta: "))
            if 1 <= dolor_num <= 3:
                puntos += 5
            elif 4 <= dolor_num <= 7:
                puntos += 10
            elif 8 <= dolor_num <= 10:
                puntos += 15
            else:
                print("Por favor, use la escala del 1 al 10.")
                continue
            break
        except ValueError:
            print("Debe ingresar un numero entero.")

    while True:
        try:
            fiebre_num = float(input("Ingrese la temperatura del usuario afectado: "))
            if fiebre_num < 37:
                puntos += 0
            elif 37 <= fiebre_num < 38:
                puntos += 5
            elif 38 <= fiebre_num < 39:
                puntos += 10
            else:
                puntos += 15
            break
        except ValueError:
            print("Ingrese un valor numerico valido.")

    os.system("cls" if os.name == "nt" else "clear")
    if puntos < 10:
        print(f"{VERDE}[CATEGORIA: LEVE]{RESET}")
        print(f"Orientacion: {usuario} puedes manejarlo desde casa. Reposo y control.")
    elif puntos <= 20:
        print(f"{AMARILLO}[CATEGORIA: MODERADO]{RESET}")
        print(f"Orientacion: {usuario} te recomiendo pedir un turno medico pronto.")
    else:
        print(f"{ROJO}[CATEGORIA: URGENTE]{RESET}")
        print(f"Orientacion: ¡ATENCION! {usuario} Dirigite a urgencias de inmediato.")
    time.sleep(1)


# ─── API (usado por Flask en app.py) ─────────────────────────────────────────

def evaluar_riesgo_api(nombre: str, dolor: int, temperatura: float) -> dict:
    """
    Recibe los datos del formulario web y devuelve un dict con la categoria
    y el mensaje de orientacion. Lo consume el endpoint POST /api/triage.
    """
    puntos = 0

    if 1 <= dolor <= 3:
        puntos += 5
    elif 4 <= dolor <= 7:
        puntos += 10
    elif 8 <= dolor <= 10:
        puntos += 15

    if temperatura < 37:
        puntos += 0
    elif 37 <= temperatura < 38:
        puntos += 5
    elif 38 <= temperatura < 39:
        puntos += 10
    else:
        puntos += 15

    if puntos < 10:
        categoria = "LEVE"
        mensaje   = f"{nombre}, podés manejarlo desde casa. Reposo y control."
    elif puntos <= 20:
        categoria = "MODERADO"
        mensaje   = f"{nombre}, te recomendamos pedir un turno médico pronto."
    else:
        categoria = "URGENTE"
        mensaje   = f"¡ATENCIÓN! {nombre}, dirigite a urgencias de inmediato."

    return {"categoria": categoria, "mensaje": mensaje, "puntos": puntos}


# ─── Ejecutar CLI si se corre directamente ───────────────────────────────────

if __name__ == "__main__":
    evaluar_riesgo_cli()
