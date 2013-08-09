var Id3 = require('./Id3.js');
var examples = [
{day:'D1',outlook:'Sunny', temp:'Hot', humidity:'High', wind: 'Weak',play:'No'},
{day:'D2',outlook:'Sunny', temp:'Hot', humidity:'High', wind: 'Strong',play:'No'},
{day:'D3',outlook:'Overcast', temp:'Hot', humidity:'High', wind: 'Weak',play:'Yes'},
{day:'D4',outlook:'Rain', temp:'Mild', humidity:'High', wind: 'Weak',play:'Yes'},
{day:'D5',outlook:'Rain', temp:'Cool', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D6',outlook:'Rain', temp:'Cool', humidity:'Normal', wind: 'Strong',play:'No'},
{day:'D7',outlook:'Overcast', temp:'Cool', humidity:'Normal', wind: 'Strong',play:'Yes'},
{day:'D8',outlook:'Sunny', temp:'Mild', humidity:'High', wind: 'Weak',play:'No'},
{day:'D9',outlook:'Sunny', temp:'Cool', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D10',outlook:'Rain', temp:'Mild', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D11',outlook:'Sunny', temp:'Mild', humidity:'Normal', wind: 'Strong',play:'Yes'},
{day:'D12',outlook:'Overcast', temp:'Mild', humidity:'High', wind: 'Strong',play:'Yes'},
{day:'D13',outlook:'Overcast', temp:'Hot', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D14',outlook:'Rain', temp:'Mild', humidity:'High', wind: 'Strong',play:'No'}
];
var features = ['outlook', 'temp', 'humidity', 'wind'];
var target = 'play';
var id = new Id3();
var tree = id.buildTree(examples,target,features);
var instance = { "outlook": "Sunny", "temp": "Hot", "humidity": "Normal", "wind": "Weak" };
var val = id.predict(tree,instance);
console.log(val);
