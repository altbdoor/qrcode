import{G as M,I as T,S as L,A as Y,a as z,E as W,b as H,B as w,C as O,M as N,V as F,c as V,d as _,e as v,f as j}from"./IllegalStateException.0671f9fd.js";var k;(function(g){g[g.ERROR_CORRECTION=0]="ERROR_CORRECTION",g[g.CHARACTER_SET=1]="CHARACTER_SET",g[g.DATA_MATRIX_SHAPE=2]="DATA_MATRIX_SHAPE",g[g.MIN_SIZE=3]="MIN_SIZE",g[g.MAX_SIZE=4]="MAX_SIZE",g[g.MARGIN=5]="MARGIN",g[g.PDF417_COMPACT=6]="PDF417_COMPACT",g[g.PDF417_COMPACTION=7]="PDF417_COMPACTION",g[g.PDF417_DIMENSIONS=8]="PDF417_DIMENSIONS",g[g.AZTEC_LAYERS=9]="AZTEC_LAYERS",g[g.QR_VERSION=10]="QR_VERSION"})(k||(k={}));const B=k;class Z{constructor(t){this.field=t,this.cachedGenerators=[],this.cachedGenerators.push(new M(t,Int32Array.from([1])))}buildGenerator(t){const e=this.cachedGenerators;if(t>=e.length){let r=e[e.length-1];const n=this.field;for(let s=e.length;s<=t;s++){const o=r.multiply(new M(n,Int32Array.from([1,n.exp(s-1+n.getGeneratorBase())])));e.push(o),r=o}}return e[t]}encode(t,e){if(e===0)throw new T("No error correction bytes");const r=t.length-e;if(r<=0)throw new T("No data bytes provided");const n=this.buildGenerator(e),s=new Int32Array(r);L.arraycopy(t,0,s,0,r);let o=new M(this.field,s);o=o.multiplyByMonomial(e,1);const i=o.divide(n)[1].getCoefficients(),c=e-i.length;for(let f=0;f<c;f++)t[r+f]=0;L.arraycopy(i,0,t,r+c,i.length)}}class p{constructor(){}static applyMaskPenaltyRule1(t){return p.applyMaskPenaltyRule1Internal(t,!0)+p.applyMaskPenaltyRule1Internal(t,!1)}static applyMaskPenaltyRule2(t){let e=0;const r=t.getArray(),n=t.getWidth(),s=t.getHeight();for(let o=0;o<s-1;o++){const a=r[o];for(let i=0;i<n-1;i++){const c=a[i];c===a[i+1]&&c===r[o+1][i]&&c===r[o+1][i+1]&&e++}}return p.N2*e}static applyMaskPenaltyRule3(t){let e=0;const r=t.getArray(),n=t.getWidth(),s=t.getHeight();for(let o=0;o<s;o++)for(let a=0;a<n;a++){const i=r[o];a+6<n&&i[a]===1&&i[a+1]===0&&i[a+2]===1&&i[a+3]===1&&i[a+4]===1&&i[a+5]===0&&i[a+6]===1&&(p.isWhiteHorizontal(i,a-4,a)||p.isWhiteHorizontal(i,a+7,a+11))&&e++,o+6<s&&r[o][a]===1&&r[o+1][a]===0&&r[o+2][a]===1&&r[o+3][a]===1&&r[o+4][a]===1&&r[o+5][a]===0&&r[o+6][a]===1&&(p.isWhiteVertical(r,a,o-4,o)||p.isWhiteVertical(r,a,o+7,o+11))&&e++}return e*p.N3}static isWhiteHorizontal(t,e,r){e=Math.max(e,0),r=Math.min(r,t.length);for(let n=e;n<r;n++)if(t[n]===1)return!1;return!0}static isWhiteVertical(t,e,r,n){r=Math.max(r,0),n=Math.min(n,t.length);for(let s=r;s<n;s++)if(t[s][e]===1)return!1;return!0}static applyMaskPenaltyRule4(t){let e=0;const r=t.getArray(),n=t.getWidth(),s=t.getHeight();for(let i=0;i<s;i++){const c=r[i];for(let f=0;f<n;f++)c[f]===1&&e++}const o=t.getHeight()*t.getWidth();return Math.floor(Math.abs(e*2-o)*10/o)*p.N4}static getDataMaskBit(t,e,r){let n,s;switch(t){case 0:n=r+e&1;break;case 1:n=r&1;break;case 2:n=e%3;break;case 3:n=(r+e)%3;break;case 4:n=Math.floor(r/2)+Math.floor(e/3)&1;break;case 5:s=r*e,n=(s&1)+s%3;break;case 6:s=r*e,n=(s&1)+s%3&1;break;case 7:s=r*e,n=s%3+(r+e&1)&1;break;default:throw new T("Invalid mask pattern: "+t)}return n===0}static applyMaskPenaltyRule1Internal(t,e){let r=0;const n=e?t.getHeight():t.getWidth(),s=e?t.getWidth():t.getHeight(),o=t.getArray();for(let a=0;a<n;a++){let i=0,c=-1;for(let f=0;f<s;f++){const u=e?o[a][f]:o[f][a];u===c?i++:(i>=5&&(r+=p.N1+(i-5)),i=1,c=u)}i>=5&&(r+=p.N1+(i-5))}return r}}p.N1=3;p.N2=3;p.N3=40;p.N4=10;class G{constructor(t,e){this.width=t,this.height=e;const r=new Array(e);for(let n=0;n!==e;n++)r[n]=new Uint8Array(t);this.bytes=r}getHeight(){return this.height}getWidth(){return this.width}get(t,e){return this.bytes[e][t]}getArray(){return this.bytes}setNumber(t,e,r){this.bytes[e][t]=r}setBoolean(t,e,r){this.bytes[e][t]=r?1:0}clear(t){for(const e of this.bytes)Y.fill(e,t)}equals(t){if(!(t instanceof G))return!1;const e=t;if(this.width!==e.width||this.height!==e.height)return!1;for(let r=0,n=this.height;r<n;++r){const s=this.bytes[r],o=e.bytes[r];for(let a=0,i=this.width;a<i;++a)if(s[a]!==o[a])return!1}return!0}toString(){const t=new z;for(let e=0,r=this.height;e<r;++e){const n=this.bytes[e];for(let s=0,o=this.width;s<o;++s)switch(n[s]){case 0:t.append(" 0");break;case 1:t.append(" 1");break;default:t.append("  ");break}t.append(`
`)}return t.toString()}}class R{constructor(){this.maskPattern=-1}getMode(){return this.mode}getECLevel(){return this.ecLevel}getVersion(){return this.version}getMaskPattern(){return this.maskPattern}getMatrix(){return this.matrix}toString(){const t=new z;return t.append(`<<
`),t.append(" mode: "),t.append(this.mode?this.mode.toString():"null"),t.append(`
 ecLevel: `),t.append(this.ecLevel?this.ecLevel.toString():"null"),t.append(`
 version: `),t.append(this.version?this.version.toString():"null"),t.append(`
 maskPattern: `),t.append(this.maskPattern.toString()),this.matrix?(t.append(`
 matrix:
`),t.append(this.matrix.toString())):t.append(`
 matrix: null
`),t.append(`>>
`),t.toString()}setMode(t){this.mode=t}setECLevel(t){this.ecLevel=t}setVersion(t){this.version=t}setMaskPattern(t){this.maskPattern=t}setMatrix(t){this.matrix=t}static isValidMaskPattern(t){return t>=0&&t<R.NUM_MASK_PATTERNS}}R.NUM_MASK_PATTERNS=8;class d extends W{}class l{constructor(){}static clearMatrix(t){t.clear(255)}static buildMatrix(t,e,r,n,s){l.clearMatrix(s),l.embedBasicPatterns(r,s),l.embedTypeInfo(e,n,s),l.maybeEmbedVersionInfo(r,s),l.embedDataBits(t,n,s)}static embedBasicPatterns(t,e){l.embedPositionDetectionPatternsAndSeparators(e),l.embedDarkDotAtLeftBottomCorner(e),l.maybeEmbedPositionAdjustmentPatterns(t,e),l.embedTimingPatterns(e)}static embedTypeInfo(t,e,r){const n=new w;l.makeTypeInfoBits(t,e,n);for(let s=0,o=n.getSize();s<o;++s){const a=n.get(n.getSize()-1-s),i=l.TYPE_INFO_COORDINATES[s],c=i[0],f=i[1];if(r.setBoolean(c,f,a),s<8){const u=r.getWidth()-s-1,h=8;r.setBoolean(u,h,a)}else{const h=r.getHeight()-7+(s-8);r.setBoolean(8,h,a)}}}static maybeEmbedVersionInfo(t,e){if(t.getVersionNumber()<7)return;const r=new w;l.makeVersionInfoBits(t,r);let n=6*3-1;for(let s=0;s<6;++s)for(let o=0;o<3;++o){const a=r.get(n);n--,e.setBoolean(s,e.getHeight()-11+o,a),e.setBoolean(e.getHeight()-11+o,s,a)}}static embedDataBits(t,e,r){let n=0,s=-1,o=r.getWidth()-1,a=r.getHeight()-1;for(;o>0;){for(o===6&&(o-=1);a>=0&&a<r.getHeight();){for(let i=0;i<2;++i){const c=o-i;if(!l.isEmpty(r.get(c,a)))continue;let f;n<t.getSize()?(f=t.get(n),++n):f=!1,e!==255&&p.getDataMaskBit(e,c,a)&&(f=!f),r.setBoolean(c,a,f)}a+=s}s=-s,a+=s,o-=2}if(n!==t.getSize())throw new d("Not all bits consumed: "+n+"/"+t.getSize())}static findMSBSet(t){return 32-H.numberOfLeadingZeros(t)}static calculateBCHCode(t,e){if(e===0)throw new T("0 polynomial");const r=l.findMSBSet(e);for(t<<=r-1;l.findMSBSet(t)>=r;)t^=e<<l.findMSBSet(t)-r;return t}static makeTypeInfoBits(t,e,r){if(!R.isValidMaskPattern(e))throw new d("Invalid mask pattern");const n=t.getBits()<<3|e;r.appendBits(n,5);const s=l.calculateBCHCode(n,l.TYPE_INFO_POLY);r.appendBits(s,10);const o=new w;if(o.appendBits(l.TYPE_INFO_MASK_PATTERN,15),r.xor(o),r.getSize()!==15)throw new d("should not happen but we got: "+r.getSize())}static makeVersionInfoBits(t,e){e.appendBits(t.getVersionNumber(),6);const r=l.calculateBCHCode(t.getVersionNumber(),l.VERSION_INFO_POLY);if(e.appendBits(r,12),e.getSize()!==18)throw new d("should not happen but we got: "+e.getSize())}static isEmpty(t){return t===255}static embedTimingPatterns(t){for(let e=8;e<t.getWidth()-8;++e){const r=(e+1)%2;l.isEmpty(t.get(e,6))&&t.setNumber(e,6,r),l.isEmpty(t.get(6,e))&&t.setNumber(6,e,r)}}static embedDarkDotAtLeftBottomCorner(t){if(t.get(8,t.getHeight()-8)===0)throw new d;t.setNumber(8,t.getHeight()-8,1)}static embedHorizontalSeparationPattern(t,e,r){for(let n=0;n<8;++n){if(!l.isEmpty(r.get(t+n,e)))throw new d;r.setNumber(t+n,e,0)}}static embedVerticalSeparationPattern(t,e,r){for(let n=0;n<7;++n){if(!l.isEmpty(r.get(t,e+n)))throw new d;r.setNumber(t,e+n,0)}}static embedPositionAdjustmentPattern(t,e,r){for(let n=0;n<5;++n){const s=l.POSITION_ADJUSTMENT_PATTERN[n];for(let o=0;o<5;++o)r.setNumber(t+o,e+n,s[o])}}static embedPositionDetectionPattern(t,e,r){for(let n=0;n<7;++n){const s=l.POSITION_DETECTION_PATTERN[n];for(let o=0;o<7;++o)r.setNumber(t+o,e+n,s[o])}}static embedPositionDetectionPatternsAndSeparators(t){const e=l.POSITION_DETECTION_PATTERN[0].length;l.embedPositionDetectionPattern(0,0,t),l.embedPositionDetectionPattern(t.getWidth()-e,0,t),l.embedPositionDetectionPattern(0,t.getWidth()-e,t);const r=8;l.embedHorizontalSeparationPattern(0,r-1,t),l.embedHorizontalSeparationPattern(t.getWidth()-r,r-1,t),l.embedHorizontalSeparationPattern(0,t.getWidth()-r,t);const n=7;l.embedVerticalSeparationPattern(n,0,t),l.embedVerticalSeparationPattern(t.getHeight()-n-1,0,t),l.embedVerticalSeparationPattern(n,t.getHeight()-n,t)}static maybeEmbedPositionAdjustmentPatterns(t,e){if(t.getVersionNumber()<2)return;const r=t.getVersionNumber()-1,n=l.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE[r];for(let s=0,o=n.length;s!==o;s++){const a=n[s];if(a>=0)for(let i=0;i!==o;i++){const c=n[i];c>=0&&l.isEmpty(e.get(c,a))&&l.embedPositionAdjustmentPattern(c-2,a-2,e)}}}}l.POSITION_DETECTION_PATTERN=Array.from([Int32Array.from([1,1,1,1,1,1,1]),Int32Array.from([1,0,0,0,0,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,0,0,0,0,1]),Int32Array.from([1,1,1,1,1,1,1])]);l.POSITION_ADJUSTMENT_PATTERN=Array.from([Int32Array.from([1,1,1,1,1]),Int32Array.from([1,0,0,0,1]),Int32Array.from([1,0,1,0,1]),Int32Array.from([1,0,0,0,1]),Int32Array.from([1,1,1,1,1])]);l.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE=Array.from([Int32Array.from([-1,-1,-1,-1,-1,-1,-1]),Int32Array.from([6,18,-1,-1,-1,-1,-1]),Int32Array.from([6,22,-1,-1,-1,-1,-1]),Int32Array.from([6,26,-1,-1,-1,-1,-1]),Int32Array.from([6,30,-1,-1,-1,-1,-1]),Int32Array.from([6,34,-1,-1,-1,-1,-1]),Int32Array.from([6,22,38,-1,-1,-1,-1]),Int32Array.from([6,24,42,-1,-1,-1,-1]),Int32Array.from([6,26,46,-1,-1,-1,-1]),Int32Array.from([6,28,50,-1,-1,-1,-1]),Int32Array.from([6,30,54,-1,-1,-1,-1]),Int32Array.from([6,32,58,-1,-1,-1,-1]),Int32Array.from([6,34,62,-1,-1,-1,-1]),Int32Array.from([6,26,46,66,-1,-1,-1]),Int32Array.from([6,26,48,70,-1,-1,-1]),Int32Array.from([6,26,50,74,-1,-1,-1]),Int32Array.from([6,30,54,78,-1,-1,-1]),Int32Array.from([6,30,56,82,-1,-1,-1]),Int32Array.from([6,30,58,86,-1,-1,-1]),Int32Array.from([6,34,62,90,-1,-1,-1]),Int32Array.from([6,28,50,72,94,-1,-1]),Int32Array.from([6,26,50,74,98,-1,-1]),Int32Array.from([6,30,54,78,102,-1,-1]),Int32Array.from([6,28,54,80,106,-1,-1]),Int32Array.from([6,32,58,84,110,-1,-1]),Int32Array.from([6,30,58,86,114,-1,-1]),Int32Array.from([6,34,62,90,118,-1,-1]),Int32Array.from([6,26,50,74,98,122,-1]),Int32Array.from([6,30,54,78,102,126,-1]),Int32Array.from([6,26,52,78,104,130,-1]),Int32Array.from([6,30,56,82,108,134,-1]),Int32Array.from([6,34,60,86,112,138,-1]),Int32Array.from([6,30,58,86,114,142,-1]),Int32Array.from([6,34,62,90,118,146,-1]),Int32Array.from([6,30,54,78,102,126,150]),Int32Array.from([6,24,50,76,102,128,154]),Int32Array.from([6,28,54,80,106,132,158]),Int32Array.from([6,32,58,84,110,136,162]),Int32Array.from([6,26,54,82,110,138,166]),Int32Array.from([6,30,58,86,114,142,170])]);l.TYPE_INFO_COORDINATES=Array.from([Int32Array.from([8,0]),Int32Array.from([8,1]),Int32Array.from([8,2]),Int32Array.from([8,3]),Int32Array.from([8,4]),Int32Array.from([8,5]),Int32Array.from([8,7]),Int32Array.from([8,8]),Int32Array.from([7,8]),Int32Array.from([5,8]),Int32Array.from([4,8]),Int32Array.from([3,8]),Int32Array.from([2,8]),Int32Array.from([1,8]),Int32Array.from([0,8])]);l.VERSION_INFO_POLY=7973;l.TYPE_INFO_POLY=1335;l.TYPE_INFO_MASK_PATTERN=21522;class K{constructor(t,e){this.dataBytes=t,this.errorCorrectionBytes=e}getDataBytes(){return this.dataBytes}getErrorCorrectionBytes(){return this.errorCorrectionBytes}}class y{constructor(){}static calculateMaskPenalty(t){return p.applyMaskPenaltyRule1(t)+p.applyMaskPenaltyRule2(t)+p.applyMaskPenaltyRule3(t)+p.applyMaskPenaltyRule4(t)}static encode(t,e,r=null){let n=y.DEFAULT_BYTE_MODE_ENCODING;const s=r!==null&&r.get(B.CHARACTER_SET)!==void 0;s&&(n=r.get(B.CHARACTER_SET).toString());const o=this.chooseMode(t,n),a=new w;if(o===N.BYTE&&(s||y.DEFAULT_BYTE_MODE_ENCODING!==n)){const S=O.getCharacterSetECIByName(n);S!==void 0&&this.appendECI(S,a)}this.appendModeInfo(o,a);const i=new w;this.appendBytes(t,o,i,n);let c;if(r!==null&&r.get(B.QR_VERSION)!==void 0){const S=Number.parseInt(r.get(B.QR_VERSION).toString(),10);c=F.getVersionForNumber(S);const D=this.calculateBitsNeeded(o,a,i,c);if(!this.willFit(D,c,e))throw new d("Data too big for requested version")}else c=this.recommendVersion(e,o,a,i);const f=new w;f.appendBitArray(a);const u=o===N.BYTE?i.getSizeInBytes():t.length;this.appendLengthInfo(u,c,o,f),f.appendBitArray(i);const h=c.getECBlocksForLevel(e),A=c.getTotalCodewords()-h.getTotalECCodewords();this.terminateBits(A,f);const I=this.interleaveWithECBytes(f,c.getTotalCodewords(),A,h.getNumBlocks()),m=new R;m.setECLevel(e),m.setMode(o),m.setVersion(c);const E=c.getDimensionForVersion(),b=new G(E,E),P=this.chooseMaskPattern(I,e,c,b);return m.setMaskPattern(P),l.buildMatrix(I,e,c,P,b),m.setMatrix(b),m}static recommendVersion(t,e,r,n){const s=this.calculateBitsNeeded(e,r,n,F.getVersionForNumber(1)),o=this.chooseVersion(s,t),a=this.calculateBitsNeeded(e,r,n,o);return this.chooseVersion(a,t)}static calculateBitsNeeded(t,e,r,n){return e.getSize()+t.getCharacterCountBits(n)+r.getSize()}static getAlphanumericCode(t){return t<y.ALPHANUMERIC_TABLE.length?y.ALPHANUMERIC_TABLE[t]:-1}static chooseMode(t,e=null){if(O.SJIS.getName()===e&&this.isOnlyDoubleByteKanji(t))return N.KANJI;let r=!1,n=!1;for(let s=0,o=t.length;s<o;++s){const a=t.charAt(s);if(y.isDigit(a))r=!0;else if(this.getAlphanumericCode(a.charCodeAt(0))!==-1)n=!0;else return N.BYTE}return n?N.ALPHANUMERIC:r?N.NUMERIC:N.BYTE}static isOnlyDoubleByteKanji(t){let e;try{e=V.encode(t,O.SJIS)}catch{return!1}const r=e.length;if(r%2!==0)return!1;for(let n=0;n<r;n+=2){const s=e[n]&255;if((s<129||s>159)&&(s<224||s>235))return!1}return!0}static chooseMaskPattern(t,e,r,n){let s=Number.MAX_SAFE_INTEGER,o=-1;for(let a=0;a<R.NUM_MASK_PATTERNS;a++){l.buildMatrix(t,e,r,a,n);let i=this.calculateMaskPenalty(n);i<s&&(s=i,o=a)}return o}static chooseVersion(t,e){for(let r=1;r<=40;r++){const n=F.getVersionForNumber(r);if(y.willFit(t,n,e))return n}throw new d("Data too big")}static willFit(t,e,r){const n=e.getTotalCodewords(),o=e.getECBlocksForLevel(r).getTotalECCodewords(),a=n-o,i=(t+7)/8;return a>=i}static terminateBits(t,e){const r=t*8;if(e.getSize()>r)throw new d("data bits cannot fit in the QR Code"+e.getSize()+" > "+r);for(let o=0;o<4&&e.getSize()<r;++o)e.appendBit(!1);const n=e.getSize()&7;if(n>0)for(let o=n;o<8;o++)e.appendBit(!1);const s=t-e.getSizeInBytes();for(let o=0;o<s;++o)e.appendBits((o&1)===0?236:17,8);if(e.getSize()!==r)throw new d("Bits size does not equal capacity")}static getNumDataBytesAndNumECBytesForBlockID(t,e,r,n,s,o){if(n>=r)throw new d("Block ID too large");const a=t%r,i=r-a,c=Math.floor(t/r),f=c+1,u=Math.floor(e/r),h=u+1,A=c-u,I=f-h;if(A!==I)throw new d("EC bytes mismatch");if(r!==i+a)throw new d("RS blocks mismatch");if(t!==(u+A)*i+(h+I)*a)throw new d("Total bytes mismatch");n<i?(s[0]=u,o[0]=A):(s[0]=h,o[0]=I)}static interleaveWithECBytes(t,e,r,n){if(t.getSizeInBytes()!==r)throw new d("Number of bits and data bytes does not match");let s=0,o=0,a=0;const i=new Array;for(let f=0;f<n;++f){const u=new Int32Array(1),h=new Int32Array(1);y.getNumDataBytesAndNumECBytesForBlockID(e,r,n,f,u,h);const A=u[0],I=new Uint8Array(A);t.toBytes(8*s,I,0,A);const m=y.generateECBytes(I,h[0]);i.push(new K(I,m)),o=Math.max(o,A),a=Math.max(a,m.length),s+=u[0]}if(r!==s)throw new d("Data bytes does not match offset");const c=new w;for(let f=0;f<o;++f)for(const u of i){const h=u.getDataBytes();f<h.length&&c.appendBits(h[f],8)}for(let f=0;f<a;++f)for(const u of i){const h=u.getErrorCorrectionBytes();f<h.length&&c.appendBits(h[f],8)}if(e!==c.getSizeInBytes())throw new d("Interleaving error: "+e+" and "+c.getSizeInBytes()+" differ.");return c}static generateECBytes(t,e){const r=t.length,n=new Int32Array(r+e);for(let o=0;o<r;o++)n[o]=t[o]&255;new Z(_.QR_CODE_FIELD_256).encode(n,e);const s=new Uint8Array(e);for(let o=0;o<e;o++)s[o]=n[r+o];return s}static appendModeInfo(t,e){e.appendBits(t.getBits(),4)}static appendLengthInfo(t,e,r,n){const s=r.getCharacterCountBits(e);if(t>=1<<s)throw new d(t+" is bigger than "+((1<<s)-1));n.appendBits(t,s)}static appendBytes(t,e,r,n){switch(e){case N.NUMERIC:y.appendNumericBytes(t,r);break;case N.ALPHANUMERIC:y.appendAlphanumericBytes(t,r);break;case N.BYTE:y.append8BitBytes(t,r,n);break;case N.KANJI:y.appendKanjiBytes(t,r);break;default:throw new d("Invalid mode: "+e)}}static getDigit(t){return t.charCodeAt(0)-48}static isDigit(t){const e=y.getDigit(t);return e>=0&&e<=9}static appendNumericBytes(t,e){const r=t.length;let n=0;for(;n<r;){const s=y.getDigit(t.charAt(n));if(n+2<r){const o=y.getDigit(t.charAt(n+1)),a=y.getDigit(t.charAt(n+2));e.appendBits(s*100+o*10+a,10),n+=3}else if(n+1<r){const o=y.getDigit(t.charAt(n+1));e.appendBits(s*10+o,7),n+=2}else e.appendBits(s,4),n++}}static appendAlphanumericBytes(t,e){const r=t.length;let n=0;for(;n<r;){const s=y.getAlphanumericCode(t.charCodeAt(n));if(s===-1)throw new d;if(n+1<r){const o=y.getAlphanumericCode(t.charCodeAt(n+1));if(o===-1)throw new d;e.appendBits(s*45+o,11),n+=2}else e.appendBits(s,6),n++}}static append8BitBytes(t,e,r){let n;try{n=V.encode(t,r)}catch(s){throw new d(s)}for(let s=0,o=n.length;s!==o;s++){const a=n[s];e.appendBits(a,8)}}static appendKanjiBytes(t,e){let r;try{r=V.encode(t,O.SJIS)}catch(s){throw new d(s)}const n=r.length;for(let s=0;s<n;s+=2){const o=r[s]&255,a=r[s+1]&255,i=o<<8&4294967295|a;let c=-1;if(i>=33088&&i<=40956?c=i-33088:i>=57408&&i<=60351&&(c=i-49472),c===-1)throw new d("Invalid byte sequence");const f=(c>>8)*192+(c&255);e.appendBits(f,13)}}static appendECI(t,e){e.appendBits(N.ECI.getBits(),4),e.appendBits(t.getValue(),8)}}y.ALPHANUMERIC_TABLE=Int32Array.from([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,-1,-1,-1,37,38,-1,-1,-1,-1,39,40,-1,41,42,43,0,1,2,3,4,5,6,7,8,9,44,-1,-1,-1,-1,-1,-1,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,-1,-1,-1,-1,-1]);y.DEFAULT_BYTE_MODE_ENCODING=O.UTF8.getName();class C{write(t,e,r,n=null){if(t.length===0)throw new T("Found empty contents");if(e<0||r<0)throw new T("Requested dimensions are too small: "+e+"x"+r);let s=v.L,o=C.QUIET_ZONE_SIZE;n!==null&&(n.get(B.ERROR_CORRECTION)!==void 0&&(s=v.fromString(n.get(B.ERROR_CORRECTION).toString())),n.get(B.MARGIN)!==void 0&&(o=Number.parseInt(n.get(B.MARGIN).toString(),10)));const a=y.encode(t,s,n);return this.renderResult(a,e,r,o)}writeToDom(t,e,r,n,s=null){typeof t=="string"&&(t=document.querySelector(t));const o=this.write(e,r,n,s);t&&t.appendChild(o)}renderResult(t,e,r,n){const s=t.getMatrix();if(s===null)throw new j;const o=s.getWidth(),a=s.getHeight(),i=o+n*2,c=a+n*2,f=Math.max(e,i),u=Math.max(r,c),h=Math.min(Math.floor(f/i),Math.floor(u/c)),A=Math.floor((f-o*h)/2),I=Math.floor((u-a*h)/2),m=this.createSVGElement(f,u);for(let E=0,b=I;E<a;E++,b+=h)for(let P=0,S=A;P<o;P++,S+=h)if(s.get(P,E)===1){const D=this.createSvgRectElement(S,b,h,h);m.appendChild(D)}return m}createSVGElement(t,e){const r=document.createElementNS(C.SVG_NS,"svg");return r.setAttributeNS(null,"height",t.toString()),r.setAttributeNS(null,"width",e.toString()),r}createSvgRectElement(t,e,r,n){const s=document.createElementNS(C.SVG_NS,"rect");return s.setAttributeNS(null,"x",t.toString()),s.setAttributeNS(null,"y",e.toString()),s.setAttributeNS(null,"height",r.toString()),s.setAttributeNS(null,"width",n.toString()),s.setAttributeNS(null,"fill","#000000"),s}}C.QUIET_ZONE_SIZE=4;C.SVG_NS="http://www.w3.org/2000/svg";export{C as BrowserQRCodeSvgWriter};
