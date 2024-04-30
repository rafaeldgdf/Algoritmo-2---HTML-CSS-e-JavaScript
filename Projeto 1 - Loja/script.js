const items = [
    {
        id: 0,
        nome: 'Sushimonkey',
        img: 'img/SUSHI.png',
        preco: 29.90,
        quantidade: 0,
        descricao: 'Cansado de comida sem graça? Procurando um companheiro único e talentoso? Então você precisa conhecer o Sushimonkey, o macaco mais habilidoso do mundo!'
    },
    {
        id: 1,
        nome: 'Macaco CBJR',
        img: 'img/macaco chorao.png',
        preco: 39.90,
        quantidade: 0,
        descricao: 'Mostre seu amor pela banda e seu estilo radical com este macaco skatista que veste a camisa oficial do CBJR e sabe cantar até 3 músicas da banda! Ele está pronto para manobras incríveis, cantar seus hits favoritos e curtir com você!'
    },
    {
        id: 2,
        nome: 'Macaco e cachorro',
        img: 'img/macaco e cachorro.jpg',
        preco: 99.90,
        quantidade: 0,
        descricao: 'Crianças e adultos vão se apaixonar por esta dupla inseparável! Um macaco travesso e um cachorrinho fiel, prontos para as mais incríveis aventuras imaginárias.'
    },
];

const inicializarLoja = () => {
    var containerProdutos = document.getElementById('produtos');
    items.map((val)=>{
        containerProdutos.innerHTML += `
        <div class="produto-single">
            <img src="${val.img}" class="produto-imagem" />
            <div class="produto-info"> 
                <div class="produto-texto"> 
                    <p><span class="destaque-produto">${val.nome}</span></p>
                    <p class="preco">R$ <span class="destaque-preco">${val.preco.toFixed(2)}</span></p>
                    <p>${val.descricao}</p>
                    <div class="produto-genero">
                        <label for="genero-${val.id}">Gênero:</label>
                        <select id="genero-${val.id}">
                            <option value="macho">Macho</option>
                            <option value="femea">Fêmea</option>
                        </select>
                    </div>
                    <button onclick="adicionarAoCarrinho(${val.id})">Adicionar ao carrinho</button>
                    <button onclick="comprarAgora(${val.id})">Comprar agora</button>
                </div>
            </div>
        </div>
        `;
    })

    atualizarCarrinho(); // Chamada após inicializar os links "Adicionar ao carrinho"
}

const adicionarAoCarrinho = (id) => { // Função para adicionar ao carrinho
    const generoSelecionado = document.getElementById(`genero-${id}`).value;
    items[id].quantidade++;
    items[id].genero = generoSelecionado; // Salva o gênero selecionado
    atualizarCarrinho();
}

const comprarAgora = (id) => { // Função para comprar agora
    // Adiciona o produto ao carrinho
    adicionarAoCarrinho(id);
    // Salva os dados do carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(items.filter(produto => produto.quantidade > 0)));
    // Redireciona para a página do carrinho
    window.location.href = "carrinho.html";
}

const atualizarCarrinho = () => {
    var containerCarrinho = document.getElementById('carrinho');
    containerCarrinho.innerHTML = "";
    let total = 0;
    let quantidadeTotal = 0;
    items.forEach((val)=>{
        if(val.quantidade > 0){
            quantidadeTotal += val.quantidade;
            total += val.quantidade * val.preco;
            containerCarrinho.innerHTML += `
            <div class="produto-info"> 
                <img src="${val.img}" class="miniatura" />
                <p><span class="destaque-nome">${val.nome}</span> | Gênero: <span class="destaque-genero">${val.genero}</span> | quantidade: ${val.quantidade} | subtotal: R$ ${(val.quantidade * val.preco).toFixed(2)}</p>
            </div>
            <hr>
            `;
        }
    })
    document.getElementById('quantidadeTotal').textContent = quantidadeTotal;
    document.getElementById('total').textContent = total.toFixed(2);
}

const finalizarCompra = () => {
    // Filtrando apenas os produtos que foram selecionados
    const produtosSelecionados = items.filter(produto => produto.quantidade > 0);
    
    // Salvando os dados do carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(produtosSelecionados));
    
    // Redirecionar para a página carrinho.html
    window.location.href = "carrinho.html";
}

inicializarLoja();
