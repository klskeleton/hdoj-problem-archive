#include <iostream>
#include <sstream>
using namespace std;

//获取2个整数型字符串中最大的
string getStrMax(string a, string  b) {
	if (a == b)return a;
	if (a.length()==b.length()) {
		for (int i = 0; i < a.length();i++) {
			if (a[i]>b[i]) {
				return a;
			}
			else if (a[i]<b[i]) {
				return b;
			}
		}
	}
	else {
		if (a.length() > b.length()) {
			return a;
		}
		else return b;
	}
	return "";
}
 
//大整数相加
string bigIntegerSum(string a,string  b) {
	//最大字符串
	string max = getStrMax(a, b);
	//最小字符串
	string min = max == a ? b : a;
	//结果字符串
	string result;
	//2个字符串长度的差
	int sub_len = max.length() - min.length();
	//填补0
	for (int i = 0; i < sub_len; i++) {
		min = "0" + min;
	}
	//初始化result
	for (int i = 0; i < max.length(); i++)result += "0";
	for (int i = max.length()-1; i >=0; i--) {
		int maxNum, minNum, resultNum,sum;
		stringstream ss;
		ss << max[i];		//最大字符串的最后一个字符
		ss >> maxNum;
		ss.clear();
		ss << min[i];		//最小字符串的最后一个字符
		ss >> minNum;
		ss.clear();
		ss << result[i];	//目标字符的进位(1/0)
		ss >> resultNum;
		ss.clear();
		
		//和 =  a + b + 进位(1/0)
		sum = maxNum + minNum + resultNum;

		char res;
		//如果和大于10
		if (sum>=10) {
			//进位
			
			ss << sum - 10;
			ss >> res;
			result[i] = res;
			//如果索引超过 result 的长度，则增加位数，位数上的值为1
			if (i-1 < 0)result = '1' + result;
			//否则进位1
			else result[i - 1] = '1';
		}
		else {
			//不进位，直接算出结果
			ss << sum;
			ss >> res;
			result[i] = res;
		}
	}
	return result;
}

int main() {
	int n,i=0;
	cin >> n;
	while (n) {
		i++;
		string a, b;
		cin >> a >> b;
		cout << "Case " << i << ':' << endl;
		cout << a << " + " << b << " = " << bigIntegerSum(a, b)  << endl;
		//注意输出格式，最后一次不能输出空行，否则不能AC
		if (n > 1)cout <<endl;
		n--;
	}
	return 0;
}
