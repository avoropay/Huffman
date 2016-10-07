/**
 * Created by Andrey.Voropay on 10/7/2016.
 */
var TestString = "Алгоритм Хаффмана — жадный алгоритм оптимального префиксного кодирования алфавита с минимальной избыточностью.",
	TestString1 = "В чащах юга жил был цитрус - да, но фальшивый экземпляр!";

function Freq(InputString) {
	var i, treeLeaves = {};
	for (i = 0; i < InputString.length; i++) {
		if (InputString[i] in treeLeaves) {
			treeLeaves[InputString[i]] = treeLeaves[InputString[i]] + 1;
		} else {
			treeLeaves[InputString[i]] = 1;
		}
	}
	return treeLeaves;
}