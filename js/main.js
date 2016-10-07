/**
 * Created by Andrey.Voropay on 10/7/2016.
 */
var TestString = "Алгоритм Хаффмана — жадный алгоритм оптимального префиксного кодирования алфавита с минимальной избыточностью.",
	TestString1 = "В чащах юга жил был цитрус - да, но фальшивый экземпляр!";

function Freq(InputString) {
	var i, treeLeaves = {};
	for (i = 0; i < InputString.length; i++) {
		if (InputString[i] in treeLeaves) {
			treeLeaves[InputString[i]] ++;
		} else {
			treeLeaves[InputString[i]] = 1;
		}
	}
	return treeLeaves;
}

function HuffmanEncoding(str) {
	this.str = str;

	var count_chars = Freq(this.str);

	var pq = new BinaryHeap(function(x){return x[0];});
	for (var ch in count_chars)
		pq.push([count_chars[ch], ch]);

	while (pq.size() > 1) {
		var pair1 = pq.pop();
		var pair2 = pq.pop();
		pq.push([pair1[0]+pair2[0], [pair1[1], pair2[1]]]);
	}

	var tree = pq.pop();
	this.encoding = {};
	this._generate_encoding(tree[1], "");

	this.encoded_string = ""
	for (var i = 0; i < this.str.length; i++) {
		this.encoded_string += this.encoding[str[i]];
	}
}

HuffmanEncoding.prototype._generate_encoding = function(ary, prefix) {
	if (ary instanceof Array) {
		this._generate_encoding(ary[0], prefix + "0");
		this._generate_encoding(ary[1], prefix + "1");
	}
	else {
		this.encoding[ary] = prefix;
	}
}

HuffmanEncoding.prototype.inspect_encoding = function() {
	for (var ch in this.encoding) {
		console.log("'" + ch + "': " + this.encoding[ch])
	}
}

HuffmanEncoding.prototype.decode = function(encoded) {
	var rev_enc = {};
	for (var ch in this.encoding)
		rev_enc[this.encoding[ch]] = ch;

	var decoded = "";
	var pos = 0;
	while (pos < encoded.length) {
		var key = ""
		while (!(key in rev_enc)) {
			key += encoded[pos];
			pos++;
		}
		decoded += rev_enc[key];
	}
	return decoded;
};

function test() {
	var s = TestString1;
	console.log(s);

	var huff = new HuffmanEncoding(s);
	huff.inspect_encoding();

	var e = huff.encoded_string;
	console.log(e);

	var t = huff.decode(e);
	console.log(t);

	console.log('is decoded string same as original? ' + (s == t));
}

