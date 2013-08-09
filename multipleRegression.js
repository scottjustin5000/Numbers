var multipleRegression = function () {
    var dataPointCount = 0;      //N number of data points entered 
    var maxN = 20;  // maximum number of data points possible
    var independentVariableCount = 4;  //M    // number of independent variables 
    var x;
    var y = [];
    var formula;
    var m = 0;      // degree of polymonial regression
    var regrCoeff = [];
    var sigDig = 4;
    var length = 0;
    var rSquare;
    var fStatistics;
    var rMean;
    var variance;
    var mean1;
    var mean2;
    var vr1;
    var vr2;
    var fr1;
    var sr2;
    var dw;
    var mae;
    var ncon;
    var residualValues;
    var init = function () {
        x = new makeArray2(independentVariableCount, maxN);
    };
    var makeArray2 = function (x, y) {
        var count;
        this.length = x + 1;
        for (var count = 0; count <= x + 1; count++) {
            // to allow starting at 1
            this[count] = new makeArray(y);
        }

    };
    var makeArray = function (y) {
        var count;
        this.length = y + 1;
        for (var count = 0; count <= y + 1; count++){
            this[count] = 0;
        }
    };
    var det = function (a) {
        var length = a.length - 1;
        // formal length of a matrix is one bigger
        if (length == 1) return (a[1][1]);
        else {
            var i;
            var sum = 0;
            var factor = 1;
            for (var i = 1; i <= length; i++) {
                if (a[1][i] != 0) {
                    // create the minor
                    var minor = new makeArray2(length - 1, length - 1);
                    var m;
                    var n;
                    var theColumn;
                    for (var m = 1; m <= length - 1; m++) // columns
                    {
                        if (m < i) theColumn = m;
                        else theColumn = m + 1;
                        for (var n = 1; n <= length - 1; n++) {
                            minor[n][m] = a[n + 1][theColumn];
                        } // n
                    } // m
                    // compute its determinant
                    sum = sum + a[1][i] * factor * det(minor);
                }
                factor = -factor;   // alternating sum
            } // end i
        } // recursion
        return (sum);
    }; // end determinant
    var inverse = function (a) {
        var length = a.length - 1;
        var b = new makeArray2(length, length);  // inverse
        var d = det(a);
        if (d == 0) alert("singular matrix--check data");
        else {
            var i;
            var j;
            for (var i = 1; i <= length; i++) {
                for (var j = 1; j <= length; j++) {
                    // create the minor
                    var minor = new makeArray2(length - 1, length - 1);
                    var m;
                    var n;
                    var theColumn;
                    var theRow;
                    for (var m = 1; m <= length - 1; m++) // columns
                    {
                        if (m < j) {
                            theColumn = m;
                        }
                        else {
                            theColumn = m + 1;
                        }
                        for (var n = 1; n <= length - 1; n++) {
                            if (n < i){ 
                                theRow = n;
                            }
                            else{
                             theRow = n + 1;
                            }
                            minor[n][m] = a[theRow][theColumn];
                        } // n
                    } // m
                    // inverse entry
                    var temp = (i + j) / 2;
                    if (temp == Math.round(temp)){
                        factor = 1;
                    } 
                    else{
                     factor = -1;
                 }

                    b[j][i] = det(minor) * factor / d;


                } // j

            } // end i
        } // recursion
        return (b);
    };
    var shiftRight = function (theNumber, k) {
        if (k == 0) return (theNumber)
        else {
            var k2 = 1;
            var num = k;
            if (num < 0) {
                num = -num;
            }
            for (var i = 1; i <= num; i++) {
                k2 = k2 * 10
            }
        }
        if (k > 0)
        { return (k2 * theNumber) }
        else
        { return (theNumber / k2) }
    };
    var roundSigDig = function (theNumber, numDigits) {
        with (Math) {
            if (theNumber == 0) return (0);
            else if (abs(theNumber) < 0.000000000001){ return (0);}
            // warning: ignores numbers less than 10^(-12)
            else {
                var k = floor(log(abs(theNumber)) / log(10)) - numDigits
                var k2 = shiftRight(round(shiftRight(abs(theNumber), -k)), k)
                if (theNumber > 0) {return (k2)}
                else{ return (-k2);}
            } // end else
        }
    };
    var buildxy = function (rows) {
        for (var j = 0; j < rows.columns.length; j++) {
            dataPointCount++;
            for (var c = 0; c < rows.columns[j].xs.length; c++) {
                x[c + 1][dataPointCount] = rows.columns[j].xs[c];
            }
            y[dataPointCount] = rows.columns[j].y;
        }
        independentVariableCount = rows.columns[0].xs.length;
    };
    var linregr = function () {
        var k;
        var i;
        var j;
        var sum;

        var b = new makeArray(independentVariableCount + 1);
        var p = new makeArray2(independentVariableCount + 1, independentVariableCount + 1);
        var invP = new makeArray2(independentVariableCount + 1, independentVariableCount + 1);
        var mtemp = independentVariableCount + 1;
        with (Math) {
            // First define the matrices B and P
            for (i = 1; i <= dataPointCount; i++){ x[0][i] = 1};
            for (i = 1; i <= independentVariableCount + 1; i++) {
                sum = 0;
                for (k = 1; k <= dataPointCount; k++) {sum = sum + x[i - 1][k] * y[k];}
                b[i] = sum;

                for (j = 1; j <= independentVariableCount + 1; j++) {
                    sum = 0;
                    for (k = 1; k <= dataPointCount; k++){ sum = sum + x[i - 1][k] * x[j - 1][k];}
                    p[i][j] = sum;
                }
            } // i
            invP = inverse(p);

            for (k = 0; k <= independentVariableCount; k++) {
                sum = 0;

                for (j = 1; j <= independentVariableCount + 1; j++) {
                    sum = sum + invP[k + 1][j] * b[j];
                } // j 
                regrCoeff[k] = sum;
            } // k
        } // end of with math
    };
    var norm = function(z){
        z = Math.abs(z);
        var p = 1 + z * (0.04986735 + z * (0.02114101 + z * (0.00327763 + z * (0.0000380036 + z * (0.0000488906 + z * 0.000005383)))));
        p = p * p; p = p * p; p = p * p;
      return 1 / (p * p);
    };
    var calculate = function (rows) {
         var results = [];
        var predicted = [];
        var residual = [];

        with (Math) {
            buildxy(rows);
            linregr();


            var se = 0;
            var st = 0;

            var output = "y = " + roundSigDig(regrCoeff[0], sigDig);
            for (i = 1; i <= independentVariableCount; i++)
                output += " + " + roundSigDig(regrCoeff[i], sigDig) + "x" + i;
            formula = output;

            // now post the predicted values
            for (i = 0; i <= dataPointCount - 1; i++)         // arrays start at 0
            {
                var y2 = regrCoeff[0];
                for (j = 1; j <= independentVariableCount; j++) {
                    y2 += regrCoeff[j] * x[j][i + 1];
                }
                results.push(roundSigDig(y2, sigDig));
                predicted[i] = roundSigDig(y2, sigDig);
                residual[i] = (y[i + 1] - predicted[i]);
                residualValues += "(" + (i + 1) + ")" + Math.round(residual[i] * Math.pow(10, 4)) / Math.pow(10, 4) + "    ";
                se += residual[i];
                st += y[i + 1];
            } // of i = 1 to 10
            console.log(residualValues);
            console.log(se);
            console.log(st);
            var mse = se / dataPointCount;
            var mst = st / dataPointCount;

            var sse = 0;
            var sst = 0;
            for (i = 1; i <= dataPointCount; i++) {
                sse += (residual[i - 1] - mse) * (residual[i - 1] - mse);
                sst += (y[i] - mst) * (y[i] - mst);

            }
            var fStatistics = 1 - (sse / sst);
            var rSquare = ((dataPointCount - independentVariableCount - 1) * (sst - sse)) / (independentVariableCount * sse);


            console.log(fStatistics);
            console.log(rSquare);
        }
        calculateAnalysis(residual);
        console.log(results);
        return results;
    };
    var calculateAnalysis=function(residual){
      var pi = Math.PI;
        var piD2 = pi / 2;
        var piD4 = pi / 4;
        var pi2 = 2 * pi;
        var e = 2.718281828459045235;
        var e10 = 1.105170918075647625;
        var deg = 180 / pi;
        var sume = 0.0;
        var stdE = 0.0;
        for (i = 0; i < dataPointCount - 1; i++) {
            sume += residual[i];
        }
        var len = dataPointCount - 1;
        var mid = Math.floor(len / 2);
        var sume1 = 0;
        var sume2 = 0;
        var ne1 = 0;
        var ne2 = 0;
        for (i = 0; i < mid; i++) {
            sume1 += residual[i];
            ne1++;
        }
        for (i = mid; i < len; i++) {
            sume2 += residual[i];
            ne2++;
        }
        var mean1 = sume1 / ne1;
        var mean2 = sume2 / ne2;
        // Do the math
        var xe = sume / len;
        rMean = Math.round(10000000 * xe) / 10000000;
        mean1 = Math.round(10000000 * mean1) / 10000000;
        mean2 = Math.round(10000000 * mean2) / 10000000;

        for (i = 0; i < dataPointCount - 1; i++) {
            stdE += Math.pow((residual[i] - xe), 2);
        }
        var v1 = stdE / (len - 2);
        variance = Math.round(v1 * 10000000) / 10000000;
        console.log(variance);
        var stdE1 = 0;
        var stdE2 = 0;
        for (i = 0; i < mid; i++) {
            stdE1 += Math.pow(((residual[i]) - mean1), 2);
        }
        for (i = mid; i < len; i++) {
            stdE2 += Math.pow(((residual[i]) - mean2), 2);
        }
        var lvr1 = stdE1 / (ne1 - 2);
        vr1 = Math.round(10000000 * lvr1) / 10000000;

        var lvr2 = stdE2 / (ne2 - 2);
        vr2 = Math.round(10000000 * lvr2) / 10000000;
        console.log(vr1);
        console.log(vr2);
        var listA = [];
        var listB = [];
        var listC = [];
        var listA2 = [];
        var a1 = 0;
        var sumA = 0;
        for (i = 1; i < len; i++) {
            listA[a1] = parseFloat(residual[i]);
            sumA += parseFloat(residual[i]);
            a1++;
        }
        var a4 = 0;
        var sumA2 = 0;
        for (i = 2; i < len; i++) {
            listA2[a4] = parseFloat(residual[i]);
            sumA2 += parseFloat(residual[i]);
            a4++;
        }
        var a2 = 0;
        var sumB = 0;
        for (i = 0; i < len - 1; i++) {
            listB[a2] = parseFloat(residual[i]);
            sumB += parseFloat(residual[i]);
            a2++;
        }
        var a3 = 0;
        var sumC = 0;
        for (i = 0; i < len - 2; i++) {
            listC[a3] = parseFloat(residual[i]);
            sumC += parseFloat(residual[i]);
            a3++;
        }
        var meanA = sumA / a1;
        var meanA2 = sumA2 / a4;
        var meanB = sumB / a2;
        var meanC = sumC / a3;

        //calculate variance and co-variance

        var r1 = calculateVariance(meanA, meanB, listA, listB);
        fr1 = Math.round(10000000 * r1) / 10000000;

        console.log(fr1);

        var r2 = calculateVariance(meanA2, meanC, listA2, listC);

        sr2 = Math.round(10000000 * r2) / 10000000;
        console.log(sr2);
        var err = residual[0];
        var sumAbsErr = Math.abs(err);
        var sse = residual[0] * residual[0];
        var dwnn = 0;
        var dwnd = (residual[0] * residual[0]);
        var sumErr = residual[0];
        var dwn = 0;
        var MAE = 0;
        for (i = 1; i < dataPointCount; i++) {
            err = residual[i];
            sumErr = sumErr + err;
            sumAbsErr = sumAbsErr + Math.abs(err);
            dwnn = dwnn + (residual[i] - residual[i - 1]) * (residual[i] - residual[i - 1]);
            dwnd = dwnd + (residual[i] * residual[i]);
            sse = sse + err * err;
        }
        var lmae = sumAbsErr / dataPointCount;
        var ldw = dwnn / dwnd;
        mae = Math.round(lmae * 100000) / 100000;
        dw = Math.round(ldw * 100000) / 100000;
        console.log(mae);
        console.log(dw);
        normalize(residual);
    };
    var calculateVariance = function (meanA, meanB, listA, listB) {
        var varA = 0;
        var varB = 0;
        var covarAB = 0;
        for (i = 0; i < listA.length; i++) {
            varA += Math.pow((listA[i] - meanA), 2);
            varB += Math.pow((listB[i] - meanB), 2);
            covarAB += ((listB[i] - meanB) * (listA[i] - meanA));
        }
        return covarAB / Math.sqrt(varA * varB);
        //return { "covarAB": covarAB, "varA": varA, "varB": varB };
    };
    var normalize = function(residual){
        
        var len = dataPointCount - 1;
        var sumF = 0;
        var fxx = 0;
        var fx = 0;
        var xvalN = [];
        var freq = [];


        for (i = 0; i < len; i++) {
            xvalN[i] = residual[i];
            freq[i] = 1
        }

        //calculate FX and FXX
        for (i2 = 0; i2 < xvalN.length; i2++) {
            sumF += parseFloat(freq[i2]);
            fx += parseFloat(xvalN[i2]) * parseFloat(freq[i2]);
            fxx += parseFloat(freq[i2]) * (Math.pow(parseFloat(xvalN[i2]), 2));
        }
        //calculate Standard Deviation
        var sn2 = fxx - ((fx * fx) / sumF);
        sn2 = sn2 / (sumF);
        var stdN = Math.sqrt(sn2);
        var meanN = fx / sumF;

        //Standardize the Data
        var zval = [];
        for (i3 = 0; i3 < xvalN.length; i3++) {
            zval[i3] = (xvalN[i3] - meanN) / stdN;
        }

        //sort the list Z(I)
        var zvalS = [];
        for (i = 0; i < zval.length; i++) {
            zvalS[i] = zval[i];
        }
        var temp;
        for (i = 0; i < zvalS.length - 1; i++) {
            for (j = i + 1; j < zvalS.length; j++) {
                if (zvalS[j] < zvalS[i]) {
                    temp = zvalS[i];
                    zvalS[i] = zvalS[j];
                    zvalS[j] = temp;
                }
            }
        }
        //Corresponding Frequecies
        var freqS = new Array();
        for (i = 0; i < freq.length; i++) {
            freqS[i] = freq[i];
        }
        for (i = 0; i < zval.length; i++) {
            for (j = 0; j < zval.length; j++) {
                if (zvalS[i] == zval[j]) {
                    freqS[i] = freq[j];
                }
            }
        }
        //calculate F from here
        var fval = [];
        var F1 = 0;
        for (i6 = 0; i6 < zvalS.length; i6++) {
            F1 = norm(zvalS[i6]);
            if (zvalS[i6] >= 0) {
                fval[i6] = 1 - (F1) / 2;
            }
            else {
                fval[i6] = F1 / 2;
            }
            F1 = 0;
        }

        //calculate J from here
        var jval = new Array();
        jval[0] = freqS[0] / sumF;

        for (i7 = 1; i7 < zvalS.length; i7++) {
            jval[i7] = jval[i7 - 1] + (freqS[i7] / sumF);
        }

        var dp = [];
        dp[0] = Math.abs(jval[0] - fval[0]);
        var a;
        var b;
        for (i = 1; i < dataPointCount; i++) {
            a = Math.abs(jval[i] - fval[i]);
            b = Math.abs(fval[i] - jval[i - 1]);
            dp[i] = Math.max(a, b);
        }
        var temp;
        //sort the list DP(I)
        for (i = 0; i < dp.length - 1; i++) {
            for (j = i + 1; j < dp.length; j++) {
                if (dp[j] < dp[i]) {
                    temp = dp[i];
                    dp[i] = dp[j];
                    dp[j] = temp;
                }
            }
        }
        var dpp = dp[dp.length - 1];
        var d = dpp;
        var td = d.toString();   //forcing to be a string

        var a0 = Math.sqrt(sumF);
        var c1 = a0 - 0.01 + (0.85 / a0);
        var d15 = 0.775 / c1;
        var d10 = 0.819 / c1;
        var d05 = 0.895 / c1;
        var d025 = 0.995 / c1;
        var t2N = d;


        //determine the conclusion
        if (t2N > d025) {
            ncon = "Evidence against normality";
        }
        else if ((t2N <= d025) && (t2N > d05)) {
            ncon = "Sufficient evidence against normality";
        }
        else if ((t2N <= d05) && (t2N > d10)) {
            ncon = "Suggestive evidence against normality";
        }
        else if ((t2N <= d10) && (t2N > d15)) {
            ncon = "Little evidence against normality";
        }
        else if (t2N <= d15) {
            ncon = "No evidences against normality";
        }
        else {
            ncon = "Evidence against normality";
        }
        console.log(ncon);
         
    };
    return {
        init: init,
        calculate: calculate
    }
}
module.exports = multipleRegression;