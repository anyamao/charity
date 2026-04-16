@router.post(
    "/signup", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED
)
def signup(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if email exists
        existing_user = db.query(User).filter(User.email == user_in.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email уже зарегистрирован")

        # Create user
        user = User(
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            name=user_in.name,
            lastname=user_in.lastname,
            city=user_in.city,
            date_of_birth=user_in.date_of_birth,
            contact_type=ContactType(user_in.contact_type),
            contact_value=user_in.contact_value,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка сервера: {str(e)}")
