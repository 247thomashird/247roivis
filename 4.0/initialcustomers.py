
# totcalls = 29319
# containment = 0.4
# sumtotal = 0
# initialvalue = 18500
# vaon=True
# if (vaon):
# 	initialvalue*=0.8
# maxval=0
# while (initialvalue > 0 and maxval <= 2):
# 	sumtotal+=initialvalue
# 	initialvalue*=0.6
# 	maxval+=1
# sumtotal*=14.11
# print "total cost $",sumtotal

# diff = oldcost-sumtotal
# print "savings per month $",diff
import math
import sys
if (len(sys.argv)>1):
	totalcalls = float(sys.argv[1])
	containment = float(sys.argv[2])
	loops = int(sys.argv[3])
else:	
	totalcalls = 73298
	containment = 0.4
	loops = 4
modifier = 0
for i in range(0,loops):
	modifier+=math.pow(containment, i)
print round(totalcalls/modifier)