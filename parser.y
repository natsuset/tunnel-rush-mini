%{
  #include <cstdio>
  #include <iostream>
  using namespace std;

  extern "C" int yylex();
  extern int yyparse();
  extern FILE *yyin;
  #include "ast.h"
  void yyerror(const char *s);
%}

%token Func_Definition OPEN_PARAN CLOSE_PARAN COLON OPEN_BRACE CLOSE_BRACE SEMI_COLON COMMA FOR WHILE OPEN_SQ_BRACE CLOSE_SQ_BRACE BREAK IF ELSEIF ELSE CONTINUE

%left ADD SUB
%left MUL DIV MOD
%precedence NEG
%left LTEQ GTEQ LT GT EQ NEQ AND OR
%right NOT

%union
{
    char* val;
    class ASTNode *node;
}

%token <node> INT_LIT
%token <node> CHAR_LIT
%token <node> VAR_NAME READ WRITE PRINT SCAN
%token <node> TRUE
%token <node> FALSE
%token <val> INT BOOL CHAR ASSIGN_OP OPEN_BRACE CLOSE_BRACE NEQ EEQ LT GT LTOE GTOE ADD SUB MUL DIV MOD AND OR NOT QUE_MARK RETURN MAINFUNC_NAME END

%type <node> File Global_Decls Global_Declaration Global_Declaration_define Global_Declaration_use Initializer
%type <node> Body Function_list Main_function Function Arguments Statement_List Statement Var_Dec END_STATEMENT Dec_Types EndingDec
%type <node> FOR_LOOP WHILE_LOOP PRINTABLE PRINTABLE_LIST Expr Elif_Block Else_BLOCK TernaryOp MethodCall Literal ParamList Location MAINRETURN_Statement
%type <node> IF_Stmnt IF_ELSE_STMNTS Var_Declaration LOOPS BREAK_STMNT CONTINUE_STMNT IO_STMNT FILE_IO_STMNT PRINT_STMNT FUNC_CALL_STMNT RETURN_Statement epsilon Literal_LIST VAR_LIST
%type <val> COMMA BREAK CONTINUE VAR_TYPE SEMI_COLON Opers Bins

%%

BigNode : File { cout << endl << "AST Starts" << endl; $1->visit();}
        ;

File: Statement_List Body {$$ = new CompleteFileNodeWithGlobal($1, $2); cout << "File with Global";}
    | Body              {$$ = new CompleteFileNodeOnlyBody($1); cout << "File with only Body";}
	;



Global_Decls: Global_Declaration Global_Decls {$$=$2; $$->pb($1); cout << "Global Declarations" << "\n";}
    | Global_Declaration                      {$$ = new GlobalDeclNode(); $$->pb($1); cout << "Global Declaration" << "\n";}
	;
 
Global_Declaration: Global_Declaration_define {$$ = $1; cout << "GLobal Declaration define";}
    | Global_Declaration_use                  {$$ = $1; cout << "GLobal Declaration use";}
    ; 

Global_Declaration_define: Initializer SEMI_COLON                                                        {$$ = new GlobalDeclDef($1); cout << "Global define" << "\n";}
    | Initializer ASSIGN_OP Expr SEMI_COLON                                                              {$$ = new GlobalDeclDefAssign($1, $3, $2); cout << "Global Decl and Assign" << "\n";}
    | Initializer OPEN_SQ_BRACE Expr CLOSE_SQ_BRACE SEMI_COLON                                           {$$ = new GlobalDeclDef($1, $3); cout << "Global 1D array Declaration" << "\n";}
    | Initializer OPEN_SQ_BRACE Expr CLOSE_SQ_BRACE OPEN_SQ_BRACE Expr CLOSE_SQ_BRACE SEMI_COLON         {$$ = new GlobalDeclDef($1, $3, $6); cout << "Global 2D array Declaration" << "\n";}
    ;

Initializer: VAR_TYPE VAR_NAME                                                           {$$ = new Initializer($1, $2);cout <<"asd";}
    ;

Global_Declaration_use: VAR_NAME ASSIGN_OP Expr SEMI_COLON {$$ = new GlobalDeclUse($1,$2,$3); cout << "Global_Declaration_use" << "\n";}
    ;



Body: Function_list Main_function {$$ = new BodyWithFunctionsNode($1, $2); cout << "Body with Functions" << "\n";}
    | Main_function               {$$ = new BodyOnlyMainNode($1); cout << "Body with only main function" << "\n";}
    ;

Function_list: Function_list Function {$$ = $1; $$->pb($2); cout << "Function list" << "\n";}
    | Function                        {$$ = new AllFuncNode(); $$->pb($1); cout << "one function" << "\n";}
    | epsilon                         {$$ = new AllFuncNode();cout << "Function epsilon";}
    ;

epsilon:
    ;

Main_function: Func_Definition MAINFUNC_NAME OPEN_PARAN Arguments CLOSE_PARAN COLON Statement_List MAINRETURN_Statement END_STATEMENT {$$ = new MainFuncNode($2, $7, $4); cout << "Main Function" << "\n";}
    ;


Function:  Func_Definition VAR_NAME OPEN_PARAN Arguments CLOSE_PARAN COLON Statement_List RETURN_Statement END_STATEMENT {$$ = new FuncNode($2, $7, $8, $4);cout << "AGRSS HERE? " << $4 ; cout << "Function" << "\n";}
    ;

Statement_List: Statement_List Statement {$$ = $1; $$->pb($2); cout << "Statement List" << "\n";}
    | epsilon                            {$$ = new StatementNode(); cout << "Statement" << "\n";}
    ;

Statement: Var_Declaration             {$$ = $1; cout << "Var declaration" << "\n";}
    | IF_Stmnt                         {$$ = $1; cout << "IF statement" << "\n";}
    | IF_ELSE_STMNTS                   {$$ = $1; cout << "IF ELSE Statement" << "\n";}
    | LOOPS                            {$$ = $1; cout << "Loops" << "\n";}
    | BREAK_STMNT                      {$$ = $1; cout << "Break Statement" << "\n";}
    | CONTINUE_STMNT                   {$$ = $1; cout << "Continue Statement" << "\n";}
    | Expr SEMI_COLON                  {$$ = $1; cout << "Expression" << "\n";}
    | IO_STMNT SEMI_COLON              {$$ = $1; cout << "IO Statement" << "\n";}
    | FILE_IO_STMNT SEMI_COLON         {$$ = $1; cout << "FILE IO Statemtent" << "\n";}
    | PRINT_STMNT                      {$$ = $1; cout << "Print Statement" << "\n";}
    | FUNC_CALL_STMNT                  {$$ = $1; cout << "function call Statement" << "\n";}
    ;

Var_Declaration: VAR_TYPE Location SEMI_COLON {$$ = new VarDeclNode($1, $2); cout << "var declaration" << "\n";}
    ;

EndingDec: Location Var_Dec EndingDec {$$ = $3; $$->pb(new VarNameNodeQ($1, $2));}
    | Location Var_Dec                {$$ = new VarNameNode();$$->pb(new VarNameNodeQ($1, $2));}
    ;

Var_Dec: ASSIGN_OP Expr COMMA   {$$ = new DecEndNode($1, $2);}
    | COMMA                     {$$ = new DecEndNode($1);}
    | SEMI_COLON                {$$ = new DecEndNode($1);}
    ;

LOOPS: FOR_LOOP                        {$$ = $1; cout << "For Loop" << "\n";}
    | WHILE_LOOP                       {$$ = $1; cout << "While Loop" << "\n";}
    ;

PRINT_STMNT: PRINT OPEN_PARAN PRINTABLE_LIST CLOSE_PARAN SEMI_COLON {$$ = new PrintNode($3); cout << "Print Node" << "\n";}
    ;

FUNC_CALL_STMNT: VAR_NAME OPEN_PARAN PRINTABLE CLOSE_PARAN SEMI_COLON {$$ = new FuncCAllNode($1,$3); cout << "Print Node" << "\n";}
    ;

Literal_LIST: Literal COMMA Literal_LIST {$$ = $3; $$->pb($1); cout << "Literal List" << "\n";}
    | Literal                            {$$ = new LiteralListNode(); $$->pb($1); cout << "Literal Node" << "\n";}
    | VAR_NAME COMMA Literal_LIST        {$$ = $3; $$->pb($1); cout << "Variable Name List Node" << "\n";}
    | VAR_NAME                           {$$ = new LiteralListNode(); $$->pb($1); cout << "Variable Name Node" << "\n";}
    ;

PRINTABLE_LIST : PRINTABLE COMMA PRINTABLE_LIST {$$ = $1;$$->pb($1);}
    | PRINTABLE                             {$$ = new printablelist();$$->pb($1);}
    ;

PRINTABLE: Literal_LIST {$$ = $1; cout << "Literal List" << "\n";}
    | TernaryOp         {$$ = $1; cout << "Ternary OP" << "\n";}
    ;

VAR_LIST: VAR_NAME COMMA VAR_LIST        {$$ = $3; $$->pb($1); cout << "Variable Name List Node" << "\n";}
    | VAR_NAME                           {$$ = new VarListNode(); $$->pb($1); cout << "Variable Name Node" << "\n";}
    ;

IF_Stmnt: IF OPEN_PARAN Expr CLOSE_PARAN OPEN_BRACE Statement_List CLOSE_BRACE {$$ = new IFNode($3, $6); cout << "If statement Node - if(expr){st_list}" << "\n";}
    ;

IF_ELSE_STMNTS:  IF OPEN_PARAN Expr CLOSE_PARAN OPEN_BRACE Statement_List CLOSE_BRACE Elif_Block Else_BLOCK {$$ = new IfElseNode($3, $6, $9, $8); cout << "If elif else" << "\n";}
	| IF OPEN_PARAN Expr CLOSE_PARAN OPEN_BRACE Statement_List CLOSE_BRACE Else_BLOCK                       {$$ = new IfElseNode($3, $6, $8); cout << "If else" << "\n";}
    ;

Else_BLOCK: ELSE OPEN_BRACE Statement_List CLOSE_BRACE {$$ = new NodeElse($3); cout << "Else Node" << "\n";}
    ;

Elif_Block: ELSEIF OPEN_PARAN Expr CLOSE_PARAN OPEN_BRACE Statement_List CLOSE_BRACE Elif_Block {$$ = $8; $$->pb(new ElifNodeQ($3, $6));cout << "elif list" << "\n";} 
    | ELSEIF OPEN_PARAN Expr CLOSE_PARAN OPEN_BRACE Statement_List CLOSE_BRACE                  {$$ = new ElifNode();$$->pb(new ElifNodeQ($3, $6)); cout << "elif Node" << "\n";}
    ;



BREAK_STMNT: BREAK SEMI_COLON {cout << "BREAK" << "\n";}
    ;

CONTINUE_STMNT: CONTINUE SEMI_COLON {cout << "CONTINUE" << "\n";}
    ;

MAINRETURN_Statement: RETURN SEMI_COLON {cout << "RETURN;" << "\n";}
    ;

RETURN_Statement: RETURN Expr SEMI_COLON {$$ = new ReturnNode($1, $2); cout << "Return Expression Node" << "\n";}
    | RETURN SEMI_COLON                  {$$ = new ReturnNode($1); cout << "Return Node" << "\n";}
    ;

END_STATEMENT: END OPEN_PARAN MAINFUNC_NAME CLOSE_PARAN SEMI_COLON {$$ = new MainEndNode($3); cout << "Main Func End" << "\n";}
    | END OPEN_PARAN VAR_NAME CLOSE_PARAN SEMI_COLON               {$$ = new EndNode($3); cout << "Func End" << "\n";}
    ;

Arguments: VAR_TYPE VAR_NAME COMMA Arguments            {$$ = $4; $$->pb(new ArgListNodeQ($1, $2));}
    | VAR_TYPE VAR_NAME                                 {$$ = new ArgListNode();$$->pb(new ArgListNodeQ($1, $2));cout << "Arg List NOde" << "\n";}
    | epsilon                                           {$$ = new ArgListNode();cout << "no arguments" << "\n";}
    ;


VAR_TYPE: INT  {$$ = $1;}
    | BOOL     {$$ = $1;}
    | CHAR     {$$ = $1;}
    ;


FOR_LOOP: FOR OPEN_PARAN Expr SEMI_COLON Expr SEMI_COLON Expr CLOSE_PARAN OPEN_BRACE Statement_List CLOSE_BRACE {$$ = new ForNode($3, $5, $7, $10); cout << "For loop Node" << "\n";}
    ;

Expr: Expr Bins Expr               {$$ = new exprASTnode(new BinExpNode($1,$2, $3));cout << $2 << "\n";}
	| NOT Expr                    {$$ = new exprASTnode(new NotExpNode($2, $1));cout << "NOT" << "\n";}
	| SUB Expr                    {$$ = new exprASTnode(new NotExpNode($2, "-"));cout << "SUB EXpr" << "\n";}
    | Expr Opers Expr                {$$ = new exprASTnode(new BinExpNode($1, $2, $3));cout << "or" << "\n";}
	| TernaryOp                   {$$ = new exprASTnode($1);}
	| MethodCall                  {$$ = new exprASTnode($1);}
	| Literal                     {$$ = new exprASTnode($1);}
    | OPEN_PARAN Expr CLOSE_PARAN  {$$ = $2;}
    | Location                    {$$ = new exprASTnode($1);}
	;

Opers: OR         
    | AND         
    | ASSIGN_OP   
    | LT         
    | GT         
    | LTOE       
    | GTOE       
    | EEQ        
    | NEQ        
    ;

Bins: ADD
    | SUB
    | MUL
    | DIV
    | MOD
    ;


MethodCall: VAR_NAME OPEN_BRACE ParamList CLOSE_BRACE {$$ = new MethodCallNode($1, $3);}
    | VAR_NAME OPEN_BRACE CLOSE_BRACE                 {$$ = new MethodCallNode($1);}
    ;

FILE_IO_STMNT: READ OPEN_PARAN VAR_NAME CLOSE_PARAN {$$ = new IOStmntNode($1, $3);}
    | WRITE OPEN_PARAN VAR_NAME CLOSE_PARAN         {$$ = new IOStmntNode($1, $3);}
    ;

IO_STMNT: SCAN OPEN_PARAN VAR_LIST CLOSE_PARAN {$$ = new IOStmntNodeSc($1, $3);}
    ; 


WHILE_LOOP: WHILE OPEN_PARAN Expr CLOSE_PARAN OPEN_BRACE Statement_List CLOSE_BRACE {$$ = new WhileNode($3, $6);}
    ;

ParamList: VAR_NAME COMMA ParamList {$$ = $3; $$->pb($1);}
    | VAR_NAME                      {$$ = new ParamListNode(); $$->pb($1);}
    ;

TernaryOp: Expr QUE_MARK Expr COLON Expr {$$ = new TernaryNode($1, $3, $5);}
	;


Location: VAR_NAME                                                                        {$$ = $1;}
	| VAR_NAME OPEN_SQ_BRACE Expr CLOSE_SQ_BRACE                                          {$$ = new ArrNodeOne($1, $3);}
	| VAR_NAME OPEN_SQ_BRACE Expr CLOSE_SQ_BRACE OPEN_SQ_BRACE Expr CLOSE_SQ_BRACE        {$$ = new ArrNodeOne($1, $3, $6);}
	;

Literal: TRUE     {$$ = $1;}
    | FALSE       {$$ = $1;}
    | INT_LIT     {$$ = $1;}
    | CHAR_LIT    {$$ = $1;}
    ;

%%

void yyerror(const char *s)
{
        fprintf(stderr, "error: %s\n", s);
}


main(int argc, char **argv)
{
        yyparse();
        printf("Parsing Over\n");
}