import json
import sys
import time
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, flowables, Image, Paragraph, Spacer
import base64
import os

height = None
width = None


def unpack_dic(dic, indent=0, result=[]):
    for key, value in dic.items():
        if isinstance(value, dict):
            result.append((indent, key+':'))
            result = unpack_dic(value, indent+1, result)
        else:
            if key != 'signature':
                result.append((indent, key+': '+value))
    return result


def drawPageFrame(canvas, doc):
    canvas.saveState()


    canvas.restoreState()


def main():
    global height, width
    height, width = letter

    file_root_name = time.strftime('%m-%d-%y_%H%M%S')
    pdf_name = file_root_name+'.pdf'
    signature_name = file_root_name+'_1.png'
    signature_name_2 = file_root_name+'_2.png'

    form_data = json.loads(sys.argv[1])

    if not os.path.exists('uploads/signatures'):
        os.mkdir('uploads/signatures')

    signature_string = form_data['applicant']['signature']
    signature_string_2 = form_data['coApplicant']['signature']
    with open('uploads/signatures/'+signature_name, 'wb') as f:
        f.write(base64.decodestring(signature_string))
    with open('uploads/signatures/'+signature_name_2, 'wb') as f:
        f.write(base64.decodestring(signature_string_2))

    doc = SimpleDocTemplate('uploads/supplements/'+pdf_name, pagesize=(height, width))

    elem = []

    if isinstance(form_data, dict):
        form_data['applicant'].pop('signature')
        form_data['coApplicant'].pop('signature')
    for key, value in form_data.items():
        if isinstance(value, dict):
            elem.append(Paragraph(key+':', getSampleStyleSheet()['Normal']))
            for key2, value2 in value.items():
                elem.append(Paragraph('    '+key2+': '+value2, getSampleStyleSheet()['Normal']))
        else:
            elem.append(Paragraph(key+': '+value, getSampleStyleSheet()['Normal']))
        elem.append(Spacer(0, 10))
    elem.append(Image('uploads/signatures/'+signature_name))
    elem.append(Image('uploads/signatures/'+signature_name_2))

    doc.build(elem)

    for root, dirs, files in os.walk('uploads/signatures', topdown=False):
        for name in files:
            os.remove(os.path.join(root, name))
        for name in dirs:
            os.rmdir(os.path.join(root, name))
    os.rmdir('uploads/signatures')

if __name__ == '__main__':
    main()
