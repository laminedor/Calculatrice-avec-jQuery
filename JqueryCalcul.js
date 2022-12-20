$(document).ready(function(){
    $('section div.touches div').click(function() {
        //console.log($('section div.touches div p').html());
        //this.children();
        Tape = $(this).children().html();
        var ValeurImput = $('input').val();
        if(Tape[0] == 'A'){
            $('input').val(null);
        }
        else if(Tape[0] == 'C'){
            let val = $('input').val().slice(0,-1);
            $('input').val(val);

        }
        else if(Tape[0] == '='){
            $('input').val(EvaluerOp($('input').val()));
            
        }
        else{
            $('input').val(ValeurImput + Tape[0]);
            console.log($('input').val());
        }
    });



    //--------------------------------------Pour evaluer l'opperation


        
    var Pile = {"Tete": [],"taille":0};


    function PileVide(){
        if(Pile.taille == 0)
            return true
        return false;
    }


    function Empiler(val){
        Pile.Tete.push(val);
        Pile.taille++;
    }


    function Depiler(val){
        if(!PileVide())
        {
            Pile.taille--;
            return Pile.Tete.pop();
        }
        else
            return false
    }


    function EvaluerOp(Operation){
        let i = 0;
        let tailleChaine = Operation.length;
        console.log(tailleChaine);
        while(i<tailleChaine){
            let j=i;
            while(Operation[i] != '+' && Operation[i] != '-' && Operation[i] != '*' && Operation[i] != '/' && i < tailleChaine)
            {
                console.log(Operation[i]);
                i++;    
            }

            if(j == i && i < tailleChaine)
            {
                Empiler(Operation[i]);
                i++;
            }    
            else{
                if(!PileVide())
                {
                    op = Depiler();
                    if(op == '/')
                    {
                        valeur2 = Depiler();
                        calcul = parseFloat(valeur2) / parseFloat(Operation.substring(j,i));
                        chaine = calcul + "";
                        Empiler(chaine);
                    }
                    else if(op == '*')
                    {
                        valeur2 = Depiler();
                        calcul = parseFloat(valeur2) * parseFloat(Operation.substring(j,i));
                        chaine = calcul + "";
                        Empiler(chaine);
                    }
                    else if(op == '-')
                    {
                        valeur2 = Operation.substring(j,i);
                        chaine = "-" + valeur2;
                        Empiler('+');
                        Empiler(chaine);

                    }
                    else{
                        Empiler(op);
                        Empiler(Operation.substring(j,i));
                    }
            
                }
                else
                {
                    Empiler(Operation.substring(j,i))
                }
                    
            } 
            console.log(Pile.Tete);
        }
        while(!PileVide()){
            var Resultat = Depiler();
            if(!PileVide()){
                op = Depiler();
                if(op == '+')
                {
                    valeur2 = Depiler();
                    calcul = parseFloat(valeur2) + parseFloat(Resultat);
                    chaine = calcul + "";
                    Empiler(chaine);
                }
                else if(op == '-')
                {
                    valeur2 = Depiler();
                    calcul = parseFloat(valeur2) - parseFloat(Resultat);
                    chaine = calcul + "";
                    Empiler(chaine);
                }
            }
            console.log(Pile.Tete);
        }
        return Resultat;
    }

});