package com.projeto05.backend.domain;
public enum IntegranteENUM {
    ESTAGIO, JUNIOR, PLENO, SENIOR, MASTER ,COORDINATOR;

    public static boolean validar(String papel) {
        try {
            return IntegranteENUM.valueOf(papel) != null;
        } catch (Exception e) {
            return false;
        }
    }
}
