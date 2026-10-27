---
title: "Pythonの実験的JIT、3.16で削除へ 目標の速度向上に届かずPEPも取り下げ"
summary: "Python 3.13から試験的に入っていた「JITコンパイラ」が、3.16の早い段階で削除される見通しになりました。正式化に必要な提案書（PEP 836）が取り下げられ、目標の20%高速化にも届いていませんでした。"
points:
  - "Steering Councilは6カ月以内のPEP承認を条件にしていたが、PEP 836は10月19日に取り下げ"
  - "3.15のJITの速度向上は4〜12%で、目標の20%以上に届かず"
  - "高速化の代わりにはPyPyやCinderXなどの選択肢がある"
category: backend
sourceName: "InfoWorld"
sourceUrl: "https://www.infoworld.com/article/4241003/python-jettisons-the-native-jit-at-least-for-now.html"
publishedAt: "2026-10-28T07:50:00+09:00"
---

JIT（ジャストインタイム）コンパイラは、プログラムの実行中によく使われる部分を、その場でコンピューターが直接実行できる形に変換して速くする仕組みです。Pythonの標準実装にも2024年のPython 3.13から実験的に入っていましたが、取り除かれることになりました。

## 何が決まったか

InfoWorldによると、Pythonの運営を担うSteering Councilは、JITを残す条件として、6カ月以内に正式な提案書（PEP）が承認されることを求めていました。Ostrowski氏、Ken Jin氏、Bucher氏によるPEP 836がその提案書でしたが、10月19日に取り下げられました。

## なぜ削除か

Python 3.15のJITは、環境変数`PYTHON_JIT=1`で有効にでき、4〜12%の高速化にとどまりました。目標は20%以上でした。削除は3.16の早い段階になる見込みだと、X上でも@__su888氏が投稿しています。

## 代わりの選択肢

速さが必要な場合は、JITを持つ別のPython実装PyPyや、Metaが公開しているCinderXなどの選択肢があります。日本語での報道はまだ少ないと指摘する投稿も出ています。

PEP 836：https://peps.python.org/pep-0836/
