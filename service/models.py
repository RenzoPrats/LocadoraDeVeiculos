from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager
from stdimage.models import StdImageField
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, cpf_cnpj=None, password=None, is_active=True, is_staff=False, is_admin=False, **kwargs):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Usuário deve ter email.')
        if not password:
            raise ValueError('Usuário deve ter senha.')
        if not cpf_cnpj:
            raise ValueError('Usuário deve ter cpf ou cnpj.')

        if 'data_nascimento' in kwargs:
            data_nascimento = kwargs.get('data_nascimento')
        else:
            data_nascimento = "1950-01-01"

        if 'estado' in kwargs:
            estado = kwargs.get('estado')
        else:
            estado = ""

        if 'cidade' in kwargs:
            cidade = kwargs.get('cidade')
        else:
            cidade = ""

        if 'cep' in kwargs:
            cep = kwargs.get('cep')
        else:
            cep = ""

        if 'rua' in kwargs:
            rua = kwargs.get('rua')
        else:
            rua = ""

        if 'numero' in kwargs:
            numero = kwargs.get('numero')
        else:
            numero = ""

        if 'bairro' in kwargs:
            bairro = kwargs.get('bairro')
        else:
            bairro = ""

        if 'first_name' in kwargs:
            first_name = kwargs.get('first_name')
        else:
            first_name = ""

        if 'last_name' in kwargs:
            last_name = kwargs.get('last_name')
        else:
            last_name = ""

        user = self.model(
            email=self.normalize_email(email),
            cpf_cnpj= cpf_cnpj,
            data_nascimento=data_nascimento,
            estado=estado,
            cidade=cidade,
            cep=cep,
            rua=rua,
            numero=numero,
            bairro=bairro,
            first_name=first_name,
            last_name=last_name
        )

        user.set_password(password)
        user.staff = is_staff
        user.admin = is_admin
        user.active = is_active
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password=None, cpf_cnpj=None):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            cpf_cnpj=cpf_cnpj,
            is_staff=True
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, cpf_cnpj=None):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            is_staff=True,
            is_admin=True,
            cpf_cnpj=cpf_cnpj
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Endereço de Email',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) # a admin user; non super-user
    admin = models.BooleanField(default=False) # a superuser
    date_joined = models.DateField(auto_now_add=True)
    last_login = models.DateField(auto_now=True)
    #personalizados
    cpf_cnpj = models.CharField(max_length=14)
    data_nascimento = models.DateField(null=True)
    estado = models.CharField(max_length=2, null=True)
    cidade = models.CharField(max_length=100, null=True)
    cep = models.CharField(max_length=8, null=True)
    rua = models.CharField(max_length=100, null=True)
    numero = models.CharField(max_length=5, null=True)
    bairro = models.CharField(max_length=100, null=True)

    first_name = models.CharField(max_length=50, verbose_name='Nome')
    last_name = models.CharField(max_length=50, verbose_name='Sobrenome')

    # notice the absence of a "Password field", that is built in.

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['cpf_cnpj'] # Email & Password are required by default.

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

    objects = UserManager()

    class Meta:
        db_table = u"auth_user"


def get_file_path(_instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    return filename

class Carro(models.Model):
    modelo = models.CharField(max_length=100)
    marca = models.CharField(max_length=50)
    portas = models.IntegerField()
    assentos = models.IntegerField()
    transmissao = models.IntegerField()
    idade_minima = models.IntegerField()
    preco_locacao = models.DecimalField(max_digits=12, decimal_places=2)
    imagem_carro = StdImageField('Imagem_carro', null=True, blank=True, upload_to=get_file_path)

    class Meta:
        db_table = u"carro"

class Locacao(models.Model):
    cliente = models.ForeignKey('User', on_delete=models.CASCADE)
    carro = models.ForeignKey('Carro', on_delete=models.CASCADE)
    endereco_retirada = models.ForeignKey('Endereco', on_delete=models.CASCADE, related_name='endereco_retirada')
    endereco_devolucao = models.ForeignKey('Endereco', on_delete=models.CASCADE, related_name='endereco_devolucao')
    metodo_pagamento = models.ForeignKey('MetodoPagamento', on_delete=models.CASCADE)
    tipo_pagamento = models.IntegerField()
    data = models.DateTimeField(blank=True, null=True)
    devolucao = models.DateTimeField(blank=True, null=True)
    valor_total = models.DecimalField(max_digits=12, decimal_places=2)
    telefone = models.CharField(max_length=13)
    cnh = models.CharField(max_length=11)
    class Meta:
        db_table = u"locacao"

class MetodoPagamento(models.Model):
    cliente = models.ForeignKey('User', on_delete=models.CASCADE)
    numero_cartao = models.CharField(max_length=16)
    mes_validade = models.IntegerField()
    ano_validade = models.IntegerField()
    codigo_seguranca = models.IntegerField()
    descricao = models.CharField(max_length=100)
    tipo_cartao = models.IntegerField()
    nome_cartao = models.CharField(max_length=100)

    class Meta:
        db_table = u"metodo_pagamento"

class Endereco(models.Model):
    cliente = models.ForeignKey('User', on_delete=models.CASCADE)
    cep = models.CharField(max_length=8)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=2)
    rua = models.CharField(max_length=100)
    numero = models.CharField(max_length=5)
    bairro = models.CharField(max_length=100)
    descricao = models.CharField(max_length=100)

    class Meta:
        db_table = u"endereco"
