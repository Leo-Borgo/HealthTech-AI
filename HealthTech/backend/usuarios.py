import os, time

os.system("cls" if os.name == "nt" else "clear")

def crear_ficha_medica():

    usuario = input("Ingrese su nombre completo: ")
    edad = int(input("Ingrese su edad: "))
    genero = input("Ingrese su genero: ")
    fecha_nacimiento = input("Ingrese su fecha de nacimiento: ")
    num_identidad = int(input("Ingrese su numero de documento de identidad (DNI, RUT, etc): "))
    domicilio = input("Ingrese su domicilio: ")
    tel_contacto = int(input("Ingrese su telefono de contacto personal: "))
    cobertura_medica = input("Ingrese su cobertura medica: ")
    datos_contacto_emerg = int(input("Ingrese un telefono en caso de emergencias: "))

    grupo_sanguineo = input("Ingrese su grupo sanguineo: ")
    factor_rh = input("Ingrese su factor RH: ")
    enfermedades_cronicas = input("Ingrese su historial de enfermedades presente: ")
    alergias = input("Ingrese alergias (separadas entre comas): ")
    cirugias_previas = input("Ingrese antecedentes quirurgicos: ")
    vacunas_recibidas = input("Ingresar todas las vacunas recibidas (calendario completo): ")
    medicacion_actual = input("Ingrese medicacion actual que consume: ")

    # Bug fix: faltaba input() en la version original
    antecedentes_familiares_c = input("Ingrese enfermedades que algun familiar posee/tuvo: ")

    datos_personales = {
        "Nombre": usuario,
        "Edad": edad,
        "Genero": genero,
        "Fecha de Nacimiento": fecha_nacimiento,
        "Numero de Identidad": num_identidad,
        "Domicilio": domicilio,
        "Telefono de Contacto": tel_contacto,
        "Cobertura Medica": cobertura_medica,
        "Datos de Contacto Emergencias": datos_contacto_emerg
    }

    ficha_medica = {
        "Grupo Sanguineo": grupo_sanguineo,
        "Factor RH": factor_rh,
        "Enfermedades Cronicas": enfermedades_cronicas,
        "Alergias": alergias,
        "Antecedentes Quirurgicos": cirugias_previas,
        "Vacunas recibidas": vacunas_recibidas,
        "Medicacion Actual": medicacion_actual
    }

    antecedentes_familiares = {
        "Enfermedades en la Familia": antecedentes_familiares_c
    }

    os.system("cls" if os.name == "nt" else "clear")
    print("===== FICHA MEDICA GENERADA =====")
    print("\n-- Datos Personales --")
    for k, v in datos_personales.items():
        print(f"  {k}: {v}")
    print("\n-- Ficha Medica --")
    for k, v in ficha_medica.items():
        print(f"  {k}: {v}")
    print("\n-- Antecedentes Familiares --")
    for k, v in antecedentes_familiares.items():
        print(f"  {k}: {v}")
    print("=================================\n")

crear_ficha_medica()
