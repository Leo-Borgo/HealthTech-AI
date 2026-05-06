import os, time, random

def evaluar_riesgo():
    os.system("cls")
    puntos = 0
    categoria = ["LEVE", "MODERADO", "URGENTE"]
    VERDE = "\033[92m"
    AMARILLO = "\033[93m"
    ROJO = "\033[91m"
    RESET = "\033[0m"

    usuario = input("Ingrese su nombre: ")

    while True:
        try:
            dolor_num = int(input("Ingrese del 1 al 10 que tan intenso es el dolor que presenta: "))
            if dolor_num <= 3:
                puntos += 5
                break
            elif dolor_num >= 4 and dolor_num <= 7:
                puntos += 10
                break
            elif dolor_num > 7 and dolor_num <= 10:
                puntos += 15
                break
            else:
                print("Por favor, use la escala del 1 al 10.")
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

    while True:
        if puntos < 10:
            os.system("cls")
            print(f"{VERDE}[CATEGORIA: LEVE]{RESET}")
            print(f"Orientacion: {usuario} puedes manejarlo desde casa. Reposo y control.")
            time.sleep(1)
            break
        elif puntos >= 11 and puntos <= 20:
            os.system("cls")
            print(f"{AMARILLO}[CATEGORIA: MODERADO]{RESET}")
            print(f"Orientacion: {usuario} te recomiendo pedir un turno medico pronto.")
            time.sleep(1)
            break
        else:
            os.system("cls")
            print(f"{ROJO}[CATEGORIA: URGENTE]{RESET}")
            print(f"Orientacion: ¡ATENCION! {usuario} Dirigite a urgencias de inmediato.")
            time.sleep(1)
            break


evaluar_riesgo()