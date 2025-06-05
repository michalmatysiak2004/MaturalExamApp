import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from core.models import Course, Lesson

course = Course.objects.get(id=1)

lessons_data = [
    ("Wstęp", "2:20"),
    ("Mindset", "4:47"),
    ("Narzędzia", "3:22"),
    ("Przypomnienie podstaw", "12:10"),
    ("Potęgi i pierwiastki", "17:30"),
    ("Logarytmy", "12:34"),
    ("Procenty i pieniądze", "10:45"),
    ("Wyrażenia algebraiczne", "13:07"),
    ("Wzory skróconego mnożenia", "14:15"),
    ("Zbiory i przedziały", "9:32"),
    ("Nierówności liniowe", "6:12"),
    ("Układy równań", "7:27"),
    ("Wartość bezwzględna", "9:07"),
    ("Rozkład wielomianów", "12:53"),
    ("Podzielność", "15:09"),
    ("Funkcje", "11:32"),
    ("Funkcja liniowa", "9:30"),
    ("Funkcja kwadratowa", "21:14"),
    ("Równania kwadratowe", "11:22"),
    ("Nierówności kwadratowe", "5:27"),
    ("Równania wymierne", "7:08"),
    ("Przesunięcia wykresów", "6:33"),
    ("Optymalizacja", "13:40"),
    ("Okrąg", "7:38"),
    ("Kąty w okręgu", "7:28"),
    ("Trygonometria", "9:36"),
    ("Jedynka trygonometryczna", "13:29"),
    ("Twierdzenie cosinusów", "4:44"),
    ("Trójkąty", "9:03"),
    ("Trójkąty podobne", "10:53"),
    ("Planimetria", "17:23"),
    ("Geometria analityczna", "22:46"),
    ("Graniastosłupy", "21:32"),
    ("Ostrosłupy", "13:41"),
    ("Bryły obrotowe", "20:46"),
    ("Ciągi", "8:10"),
    ("Ciągi arytmetyczne", "11:12"),
    ("Ciągi geometryczne", "7:27"),
    ("Kombinatoryka", "12:54"),
    ("Prawdopodobieństwo", "18:57"),
    ("Statystyka", "11:11"),
    ("Rozwiązanie arkusza", "0:00"),
]

def time_str_to_minutes(time_str):
    minutes, seconds = map(int, time_str.split(":"))
    return minutes + (1 if seconds >= 30 else 0)

for name, time_str in lessons_data:
    Lesson.objects.create(
        name=name,
        description="",
        time=time_str_to_minutes(time_str),
        course=course
    )

print("Dodano lekcje!")
