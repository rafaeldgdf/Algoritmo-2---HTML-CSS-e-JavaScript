document.addEventListener("DOMContentLoaded", function() {
    // Recuperando os dados do carrinho do localStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Selecionando o elemento onde os produtos serão exibidos
    const carrinhoContainer = document.getElementById('carrinho-container');

    // Selecionando o elemento onde o valor total da compra será exibido
    const totalCompraElement = document.getElementById('total-compra');

    // Inicializando o total da compra
    let totalCompra = 0;

    // Exibindo os produtos do carrinho na página carrinho.html
    if (carrinho && carrinho.length > 0) {
        carrinho.forEach((produto) => {
            // Criando elementos HTML para exibir os detalhes de cada produto do carrinho
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto');

            // Adicionando a imagem do produto com a classe
            const imagemProduto = document.createElement('img');
            imagemProduto.src = produto.img;
            imagemProduto.alt = produto.nome;
            imagemProduto.classList.add('imagem-produto-carrinho'); // Adicionando a classe à imagem
            produtoDiv.appendChild(imagemProduto);

            // Destaque do nome do produto
            const nomeProduto = document.createElement('p');
            nomeProduto.innerHTML = "<span class='destaque'>" + produto.nome + "</span>";

            const precoProduto = document.createElement('p');
            precoProduto.textContent = "Preço: R$ " + produto.preco.toFixed(2);

            const generoProduto = document.createElement('p');
            generoProduto.textContent = "Gênero: " + produto.genero;

            const quantidadeProduto = document.createElement('p');
            quantidadeProduto.textContent = "Quantidade: " + produto.quantidade;

            // Calculando o subtotal do produto
            const subtotalProduto = produto.quantidade * produto.preco;
            totalCompra += subtotalProduto;

            const subtotalProdutoElement = document.createElement('p');
            subtotalProdutoElement.textContent = "Subtotal: R$ " + subtotalProduto.toFixed(2);

            // Adicionando os elementos à div do produto
            produtoDiv.appendChild(nomeProduto);
            produtoDiv.appendChild(precoProduto);
            produtoDiv.appendChild(generoProduto); // Adicionando o gênero do produto
            produtoDiv.appendChild(quantidadeProduto);
            produtoDiv.appendChild(subtotalProdutoElement);

            // Adicionando a div do produto ao container do carrinho
            carrinhoContainer.appendChild(produtoDiv);
        });
    } else {
        // Se o carrinho estiver vazio, exibe uma mensagem
        const mensagem = document.createElement('p');
        mensagem.textContent = "Carrinho vazio!";
        carrinhoContainer.appendChild(mensagem);
    }

    // Exibindo o valor total da compra
    totalCompraElement.textContent = "Total: R$ " + totalCompra.toFixed(2);

    // Adicionando um ouvinte de evento ao botão "Pagar"
    const botaoPagar = document.getElementById('botao-pagar');
    botaoPagar.addEventListener('click', limparCarrinho);
});

// Função para limpar o carrinho e exibir mensagem de sucesso
const limparCarrinho = () => {
    // Limpar o carrinho no localStorage
    localStorage.removeItem('carrinho');

    // Atualizar a exibição do carrinho na página
    const carrinhoContainer = document.getElementById('carrinho-container');
    carrinhoContainer.innerHTML = "<p>Sucesso, seu amiguinho chegará em breve!</p>";

    // Atualizar o valor total da compra
    const totalCompraElement = document.getElementById('total-compra');
    totalCompraElement.textContent = "";
};
