package com.ozdemirhakan.Agreement.Management.Application.core.utilities.results;

import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;

public class SuccessResult extends Result{
		public SuccessResult() {
			super(true);
		} 
		
		public SuccessResult(String message) {
			super(true,message);
		}
		public SuccessResult(String message, Agreement agreement) {
		super(true,message);
	}
}
