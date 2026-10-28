"""Word letterhead with the same header and footer artwork as the PDF: python deliverables/source/build_docx.py"""
import os
from PIL import Image
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Mm, Pt, RGBColor

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "Tourmelloh-Letterhead.docx")
SCALE = 4 * 794 / 210  # screenshot pixels per millimetre (A4 at 96 dpi, rendered at 4x)


def content_crop(name):
    """Trim the 20 mm side margins so the art sits exactly on Word's text width."""
    im = Image.open(os.path.join(HERE, name))
    left = round(20 * SCALE)
    cropped = im.crop((left, 0, im.width - left, im.height))
    path = os.path.join(HERE, name.replace(".png", "-word.png"))
    cropped.save(path)
    return path, cropped.height / SCALE


doc = Document()
section = doc.sections[0]
section.page_width, section.page_height = Mm(210), Mm(297)
section.left_margin = section.right_margin = Mm(20)
section.header_distance = Mm(0)
section.footer_distance = Mm(10)
header_img, header_mm = content_crop("header.png")
footer_img, _ = content_crop("footer.png")
section.top_margin = Mm(header_mm + 10)
section.bottom_margin = Mm(26)

head = section.header.paragraphs[0]
head.paragraph_format.space_before = Pt(0)
head.add_run().add_picture(header_img, width=Mm(170))
foot = section.footer.paragraphs[0]
foot.add_run().add_picture(footer_img, width=Mm(170))

style = doc.styles["Normal"]
style.font.name = "Arial"
style.font.size = Pt(10.5)
style.font.color.rgb = RGBColor(0x15, 0x2C, 0x20)
style.paragraph_format.space_after = Pt(8)
style.paragraph_format.line_spacing = 1.35

date = doc.add_paragraph("Date:")
date.alignment = WD_ALIGN_PARAGRAPH.RIGHT
doc.add_paragraph("")
doc.add_paragraph("Dear ,")
doc.add_paragraph("")
doc.add_paragraph("Warm regards,")
sign = doc.add_paragraph()
run = sign.add_run("Tourmelloh")
run.bold = True
doc.add_paragraph("+91 77069 97271 · tourmelloh@gmail.com")
doc.save(OUT)
print("saved", os.path.abspath(OUT))
