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


    # canvas.drawImage(
    # 'outputImage.png', 0, 0, height, width,
    # preserveAspectRatio=True, anchor='c')
    canvas.restoreState()


def main():
    global height, width
    height, width = letter

    file_root_name = time.strftime('%m-%d-%y_%H%M%S')
    pdf_name = file_root_name+'.pdf'
    signature_name = file_root_name+'_1.png'
    signature_name_2 = file_root_name+'_2.png'

    form_data = json.loads(sys.argv[1])

    # form_data = {
    #     "Name": "Adam",
    #     "Data": {
    #         "Signature": "DSADJHGASKHJDGASKJHDG JKAJKSDGAHJKSDG KASHJDG AHJSDG AHJKSDG JKASGD JKASHDG GSAHD",
    #         "Date": "1/1/2001"
    #     },
    #     "applicant": {
    #         "signature": u"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"
    #     }
    # }
    if not os.path.exists('uploads/signatures'):
        os.mkdir('uploads/signatures')

    signature_string = form_data['applicant']['signature']
    signature_string_2 = form_data['coApplicant']['signature']
    with open('uploads/signatures/'+signature_name, 'wb') as f:
        f.write(base64.decodestring(signature_string))
    with open('uploads/signatures/'+signature_name_2, 'wb') as f:
        f.write(base64.decodestring(signature_string_2))

    doc = SimpleDocTemplate('uploads/supplements/'+pdf_name, pagesize=(height, width))


    # form_data_unpacked = unpack_dic(form_data)
    # with open('debug.txt', 'wb') as fb:
    #     fb.write(str(form_data_unpacked))

    elem = []

    # for i in range(len(form_data)):
    #     elem.append(Paragraph(form_data_unpacked[i][0]*'  '+form_data_unpacked[i][1], getSampleStyleSheet()['Normal']))
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
    # elem.append(Image('HScrollBar-2.png'))

    # elem.append(flowables.Macro('canvas.saveState()'))
    # elem.append(flowables.Macro('canvas.restoreState()'))

    doc.build(elem)

    for root, dirs, files in os.walk('uploads/signatures', topdown=False):
        for name in files:
            os.remove(os.path.join(root, name))
        for name in dirs:
            os.rmdir(os.path.join(root, name))
    os.rmdir('uploads/signatures')

if __name__ == '__main__':
    main()