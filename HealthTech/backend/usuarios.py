import os, time, random
os.system("cls")

def crear_ficha_medica():

    while True:
        usuario = input("Ingrese su nombre completo: ")
        edad = int(input("Ingrese su edad: "))
        genero = input("Ingrese su genero: ")
        fecha_nacimiento = input("Ingrese su fecha de nacimiento: ")
        num_identidad = int(input("Ingrese su numero de documento de identidad (DNI, RUT, etc): "))
        domicilio = input("Ingrese su domicilio: ")
        tel_contacto = int(input("Ingrese su telefono de contacto personal: "))
        cobertura_medica = input("Ingrese su cobertura medica: ")
        datos_contacto_emerg = int(input("Ingrese un telefono en caso de emergencias: "))
        break

    while True:
        grupo_sanguineo = input("Ingrese su grupo sanguineo: ")
        factor_rh = input("Ingrese su factor RH: ")
        enfermedades_cronicas = input("Ingrese su historial de enfermedades presente: ")
        alergias = input("Ingrese alergias (separadas entre comas): ")
        cirugias_previas = input("Ingrese antecedentes quirurgicos: ")
        vacunas_recibidas = input("Ingresar todas las vacunas recibidas (calendario completo): ")
        medicacion_actual = input("Ingrese medicacion actual que consume: ")
        break

    while True:
        antecedentes_familiares_c = ("Ingrese enfermedades que algun familiar posee/tuvo: ")
        break

    datos_personales = {
        "Nombre": (f"{usuario}"),
        "Edad": (f"{edad}"),
        "Genero": (f"{genero}"),
        "Fecha de Nacimiento": (f"{fecha_nacimiento}"),
        "Numero de Identidad": (f"{num_identidad}"),
        "Domicilio": (f"{domicilio}"),
        "Telefono de Contacto": (f"{tel_contacto}"),
        "Cobertura Medica": (f"{cobertura_medica}"),
        "Datos de Contacto Emergencias": (f"{datos_contacto_emerg}")
    }

    ficha_medica = {
        "Grupo Sanguineo": (f"{grupo_sanguineo}"),
        "Factor RH": (f"{factor_rh}"),
        "Enfermedades Cronicas": (f"{enfermedades_cronicas}"),
        "Alergias": (f"{alergias}"),
        "Antecedentes Quirurgicos": (f"{cirugias_previas}"),
        "Vacunas recibidas": (f"{vacunas_recibidas}"),
         "Medicacion Actual": (f"{medicacion_actual}")
    }

    antecedentes_familiares = {
        "Enfermedades en la Familia": (f"{antecedentes_familiares_c}")
    }

    print(datos_personales, ficha_medica, antecedentes_familiares)

crear_ficha_medica()