#include <iostream>
#include <sstream>
using namespace std;

//��ȡ2���������ַ���������
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
 
//���������
string bigIntegerSum(string a,string  b) {
	//����ַ���
	string max = getStrMax(a, b);
	//��С�ַ���
	string min = max == a ? b : a;
	//����ַ���
	string result;
	//2���ַ������ȵĲ�
	int sub_len = max.length() - min.length();
	//�0
	for (int i = 0; i < sub_len; i++) {
		min = "0" + min;
	}
	//��ʼ��result
	for (int i = 0; i < max.length(); i++)result += "0";
	for (int i = max.length()-1; i >=0; i--) {
		int maxNum, minNum, resultNum,sum;
		stringstream ss;
		ss << max[i];		//����ַ��������һ���ַ�
		ss >> maxNum;
		ss.clear();
		ss << min[i];		//��С�ַ��������һ���ַ�
		ss >> minNum;
		ss.clear();
		ss << result[i];	//Ŀ���ַ��Ľ�λ(1/0)
		ss >> resultNum;
		ss.clear();
		
		//�� =  a + b + ��λ(1/0)
		sum = maxNum + minNum + resultNum;

		char res;
		//����ʹ���10
		if (sum>=10) {
			//��λ
			
			ss << sum - 10;
			ss >> res;
			result[i] = res;
			//����������� result �ĳ��ȣ�������λ����λ���ϵ�ֵΪ1
			if (i-1 < 0)result = '1' + result;
			//�����λ1
			else result[i - 1] = '1';
		}
		else {
			//����λ��ֱ��������
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
		//ע�������ʽ�����һ�β���������У�������AC
		if (n > 1)cout <<endl;
		n--;
	}
	return 0;
}
