"""bringing up to date

Revision ID: a5865dc884a7
Revises: 1ed8ee666c89
Create Date: 2022-05-23 03:25:47.664902

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a5865dc884a7'
down_revision = '1ed8ee666c89'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('average_guesses', sa.Float(), nullable=True))
    op.create_index(op.f('ix_user_average_guesses'), 'user', ['average_guesses'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_average_guesses'), table_name='user')
    op.drop_column('user', 'average_guesses')
    # ### end Alembic commands ###
