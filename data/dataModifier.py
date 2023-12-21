import csv

fi = open("political-regimes.csv",'r')
fo = open("Regimes.csv",'w')

i=0
for lines in fi:
    if i ==0:

        i+=1
    else:
        Entity,Code,Year,Political =lines.split(',')
        date= int(Year)
        if date >=2000 :
            fo.writelines(lines)
            if date==2020:
                l=','.join([Entity,Code,"2021",Political])
                l1=','.join([Entity,Code,"2022",Political])


fi.close()
fo.close()




